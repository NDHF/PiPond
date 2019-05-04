# THE PI POND

Calculate Pi by firing randomly-aimed cannonballs into a pond.

# OVERVIEW

The Pi Pond calculates Pi by firing cannonballs into a pond at random. It demonstrates how information can be obtained out of randomness, using the relationship between the area of a square, and the area of a circle. 

The Pi Pond imagines a circular pond, set inside a square field. The diameter of the pond is equal to the width of the field. By firing random cannonballs, and finding their coordinates, we can approximate the area of the pond and the field. The ratio between the number of coordinates inside the circle, the total number of coordinates is Pi divided by four. 

The Pi Pond was inspired by a challenge in A.K. Dewdney's The Armchair Universe, a book about recreational computing and mathematics. 

# THE MATH

## Pi / 4

Imagine a circle inside a square. The diameter of the circle is equal to the width (and height) of the square. Put another way, the width of the square is equal to twice the radius of the circle. 

The area of the square is width^2. Since the width of the square is twice the radius of the circle, we can write the area of the circle as (Radius * 2)^2. This can be simplified to 4 * Radius^2. 

The area of the circle is Pi * Radius^2. 

The ratio between the area of the circle and the area of the square is (Pi * Radius^2) / (4 * Radius^2). This can be simplified to Pi / 4. 

## INFORMATION FROM RANDOMNESS

Here's how the program works:

1. A random coordinate is plotted onto the field. 
2. The distance from the random coordinate to the center of the field is calculated using the Pythagorean Theorem. 
3. If the distance from the random coordinate to the field's center is less than the pond's radius, the coordinate is within the pond.
4. After each shot, the number of shots that have fallen into the pond is divided by the total number of shots fired so far. When this number is multiplied by four, the result is an approximation of Pi. 

With my implementation, Pi can be approximated to 3.1 after less than 100 shots. 

## LIMITATIONS

My Pi Pond uses JavaScript's Math.Random() function, which is only pseudo-random at best. 

# VISUALIZATION

The Pi Pond is visualized using the HTML5 canvas element. 

# FUTURE UPDATES

### Implementation

* Running the coordinate-generation on a server, and the visualization on the front end. This would allow the tally to continue indenfinitely, instead of restarting each time the page is reloaded.
* In the meantime, I can save the relevant variables in local storage, allowing the tally to resume after reloading. 

### Explanations

* A more visual explation, including a captioned video.

### Visualization

* Cannons that fire the cannonballs
* Thud and splashing animations, rather than text


