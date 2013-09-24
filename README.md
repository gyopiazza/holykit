Holy-Kit
========


Concept
- Include holy-kit.less (nothing gets into the CSS)
- 
- 


TODO
- Rename "make-" to "generate-"
- "generate-" mixins echo classes/styles to the CSS
- "make-" mixins will be used for semantic styling (example: make-row, make-column, make-inline-list, etc...)





A **fluid grid** with support for **fixed width margins** (gutters). Made with **LESS/CSS**, it allows for any amount of columns, 
it's **responsive** and **semantic** ready! It uses a combination of *box-sizing* and *padding* to achieve the result.

Supported by real browsers and IE8+.

[View the demo &rarr;](http://codepen.io/gyopiazza/fullpage/irILa)








Changes made on 3rd party libraries
- Removed the grid-system from Preboot
- Renamed @input_color_placeholder variable in Preboot (line~132)
- Renamed preboot.less to utilities.less
- Removed line-height from icons.less to match the vertical rhythm