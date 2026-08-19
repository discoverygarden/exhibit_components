# UIKit Heading Component

## Introduction
Adds a SDC Heading component which supports UIKit markup and classes.

Relevant UIKit documentation:
- [Heading component](https://getuikit.com/docs/heading)

## Features & Usage
Configuration is included with the `exhibit_components` module that houses
this Heading component to create the `UIKit Heading` Paragraph type and its
fields which get passed through a paragraph template to map those field values
to be displayed as this component.

### Component Properties
- `heading`: The text content of the heading.
- `level`: The hierarchical level of the heading;
  must be 1, 2, 3, 4, 5, or 6. 1 being the top level and 6 being the deepest
  level of nesting available.
- `divider`: Whether or not to use add a horizontal divider under the
  heading, as seen at https://getuikit.com/docs/heading#divider-modifier
- `bullet`: Whether or not to display a bullet marker before the header, as
  seen at https://getuikit.com/docs/heading#bullet-modifier
- `line`: Whether or not to have a horizontal line displayed beside the
  heading vertically centred with the heading text, as seen at
  https://getuikit.com/docs/heading#line-modifier
- `alignment`: Surfacing the option to horizontally align text as 'left',
  'right', or 'center', as seen at
  https://getuikit.com/docs/text#text-alignment
