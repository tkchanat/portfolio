# Image Auto-Mesh
![](img/image-auto-mesh.md/arap.png)

This is a part of the bigger project that I'm working on (Spoiler: [ARAP](https://www-ui.is.s.u-tokyo.ac.jp/~takeo/papers/rigid.pdf)). My goal is to automatically generate a triangulated mesh around an RGBA image. But I can already tell there are few obvious obstacles/problems along the way need to be tackled.

1. Generating contours around the image is hard, especially if the edges aren't smooth, of which can occur naturally for irregular brush strokes.
2. Contours cannot be self-intersecting, no one wants that.
3. Triangle sizes and shape are really important. They must be mostly equiangular and evenly distributed to minimize texture stretching when deformed.
4. ... I will add more to this when I can think of anything

## Contouring
Contour refers to both the exterior and interior [polygonal chain](https://en.wikipedia.org/wiki/Polygonal_chain) that sits on top of a similar isovalue and form a level set. 

In the original ARAP paper, they uses marching squares to extract the contour. Of course it makes sense to treat the image alpha mask as a scalar field. And run the marching square algorithm over the pixel grid to extract the desire contour.

That's exactly what I did. Quantizing the image's alpha channel with a threshold, iterate through each 2x2 pixel grid cell and apply the corresponding cell configuration. Yet, the result isn't too appealing...

<insert image later\>

The extracted contour is very jagged like a coastline. Normally this wouldn't be a problem, because it's still a valid contour. But ideally, I'd like to deform a mesh with less vertices/triangles as less complex mesh = faster deformation. 

Honestly, we can apply some line segment decimation algorithms like the [Ramer-Douglas-Perucker](https://en.wikipedia.org/wiki/Ramer–Douglas–Peucker_algorithm) and [Visvalingam-Whyatt](https://en.wikipedia.org/wiki/Visvalingam–Whyatt_algorithm) algorithm. Yeah, they will do the job, but that's extra work. Not only it takes time to compute, but also it can open a can of worms with exceptional cases and potentially self-intersecting contour. 

![](https://upload.wikimedia.org/wikipedia/commons/thumb/4/49/Douglas–Peucker_and_Visvalingam–Whyatt_simplification_algorithms.svg/1920px-Douglas–Peucker_and_Visvalingam–Whyatt_simplification_algorithms.svg.png)

### First Attempt
So what I have in mind is some simpler, a naive approach. Just hear me out. 

What if... what if, like a shrinking plastic wrap, start with an N-gon, then find the closest intersection with the target shape. That has to work, right? 

The process goes like this: 

I get the center of the bounding box of all the opaque pixels as the center of the N-gon. Or, I can use the centroid of those pixels, not sure which is better. Then I construct a line segment running from the N-gon's vertex to the center as my "ray". After that, find the closest intersection with [Differential Diagnosis (DDx)](https://www.google.com/url?sa=t&source=web&rct=j&opi=89978449&url=https://en.wikipedia.org/wiki/Differential_diagnosis&ved=2ahUKEwjI6qDp79uMAxUfHjQIHXW7HbMQFnoECB8QAQ&usg=AOvVaw2pNwTcmNGopCeEvIwUB4MK) algorithm and step towards the center until it returns the distance to the closest opaque hit. Finally apply vertex displacement along the ray direction with the given hit distance.

But of course we don't want the final constructed mesh to "eat" away parts of the image, so padding was necessary. Adding padding is simple, just subtract a certain amount from the closest hit distance. And the end result looks like this.

![](img/image-auto-mesh.md/first-attempt.png){:style="width:20rem"}

And when you really think about it, it will NEVER generate a self-intersecting contour. Think of a pizza, shrinking the N-gon vertices is just like biting away an uncut pizza's crust (by the way, that's not how you eat a pizza). My point is, it will always remain a non-intersecting polygon. 

The only criticisms are, 

1. Line segments are non-uniform. Concave areas have steep edges because of the large differences in DDx hit distance. 
2. Elongated/spiky shapes can have extruded areas where the insufficiently subdivided N-gon can totally missed the intersection.

For the non-uniform edges, I could either run an iterative segment relaxation process until they are evenly distributed, or better approach is to subdivide and interpolate the curve if it exceeded the maximum edge length. 

Except for the second point, yeah, I'd admit this approach isn't really suitable for these cases. 

<insert image later\>

## Back to Square One
The pizza method obviously doesn't work for all cases, but marching squares gives me too much high frequency details. How can we go about this? 

If the high frequency details is the only problem to have a clean contour, why not just filter them out? 

That's a really good observation. It's essentially downscaling the image and calculate the contour on a lower resolution image. It would be blocky for sure, but with proper interpolation, it can still be visually appealing. The bonus point is, using marching squares, we know that it won't produce self-intersecting contour and each edge length won't exceed the diagonal length of the grid. 

TODO

## Meshing
Good contour, huh? But how to turn it into a triangle mesh? We couldn't just do a [ear clipping triangulation](https://en.wikipedia.org/wiki/Two_ears_theorem), that's embarrassing. And bad triangulation leads to all kinds of texture stretching after deformation. 

### Poisson Disk Sampling

### Constrained Delaunay Triangulation