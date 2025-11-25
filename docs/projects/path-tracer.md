# Building an Idiomatic Path Tracer
This is my ambitious project of building an ergonomic path tracer in Rust. I am not aiming to document everything here, but I would post interesting architectural designs here to show my thought process in each components.

My goal is to make the computations as close as possible to the mathematical notations. Because it's essentially what mathematicians/physicists used to communicate concisely about an idea. Every function should take the least information as needed. I aim to boil down to its simplest and cleanest form. Treat this page as my white paper of how I would write a path tracer.

## Ray
I'm seeing every path tracers out there has `t_near` and `t_far` built into the ray class, which annoys me because a ray shouldn't have an associated range. It only needs a origin and a direction.

```rust
struct Ray {
    org: Vec3,
    dir: Vec3,
}
```

Cases where you need a near and far tests, just include them as function arguments.

## Bounding Volume Hierarchy
Here defines anything that is bounded and ray intersectable should be a buildable primitive for a BVH. This includes geometry primitives (i.e. triangle, sphere, curve, etc.) and BVHs, as long as the type implements BvhPrimitive, you are allowed to build nested hierarchies.

```rust
trait Bounded {
    type Bound;
    fn bound(&self) -> Self::Bound;
}

trait RayIntersectable {
    type Result;
    fn intersects(&self, ray: &Ray, t_far: f32) -> Self::Result;
}

trait BvhPrimitive: RayIntersectable + Bounded<Bound = Aabb3> {}
```

## Gathering Radiance
This is what people refers to a radiance integrator, because it uses a Monte-Carlo estimator to compute the integral of the [rendering equation](https://en.wikipedia.org/wiki/Rendering_equation). Strictly following the mathematical notation, $L_o(\mathbf{x}, \omega_o, \lambda, t)$.

```rust
trait Integrator {
    // Total spectral radiance directed outward along direction wo at time t, from a particular position x.
    fn lo(&self, x: Hit, wo: Vec3, t: f32) -> Spectrum;
}
```

## Direct Lighting
Sampling a light and evaluating its contribution along such direction with the given point should be as simple as possible. 

```rust
struct LightSample {
    p: Vec3,
    wi: Sample<Vec3>, // pdf is in solid-angle measure
    radiance: Vec3,
}

fn direct_lighting(&self, x: Hit, light: Light3D, sampler: &mut dyn Sampler) -> LightSample {
    // Generate sample from the given light
    let mut sample: LightSample = match light {
        Light::Area(area_light) => area_light.sample_area(x.point(), sampler),
        Light::Distant(distant_light) => distant_light.sample_direction(),
        Light::Dome(dome_light) => dome_light.sample_direction(sampler),
        ...
    };

    // Visibility test
    let ray = match x {
        Hit::Geometry { prim: PrimitiveHit { dg, .. }, .. } => Ray {
            org: dg.p + dg.ng.normalized() * EPSILON,
            dir: *sample.wi,
        },
        Hit::Volume => unimplemented!(),
    };
    let t_far = (sample.p - x.point()).mag() - EPSILON;
    if let Some(_hit) = self.scene.accel.intersects(&ray, t_far) {
      // Cut contributions
      sample.set_zero();
    }
    sample
}
```
