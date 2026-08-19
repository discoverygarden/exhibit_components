# Exhibit Components
Drupal module containing Single Directory Components for use in exhibit content.

## Intro
Each component in the `components` directory is used by a Paragraph template in
the `templates` directory, and the necessary configuration for the Paragraph
entities and their fields should be included in this module's `config/optional`
directory. As long as you have a content type set up to use any of the included
Paragraphs, those paragraphs should get displayed using the relevant template
and component. Configuration for an Exhibit content type is included in
`config/optional` as well, but the Paragraphs and components can be used in
your own custom content type if you prefer.

## Requirements

Technically, this could be used outside the Islandora ecosystem; however, you
would miss out on some included components unless you do some custom work to
set up your own Paragraph templates. This is why `drupal/islandora` is only
suggested in `composer.json` instead of being a hard requirement.

## Libraries
By default, this module uses CDNs for the uikit js and css libraries,
but it will use locally installed libraries when possible.

Defaulting to CDNs is convenient for quickly installing and doing some
preliminary testing, but it is not recommended to rely on CDNs; to install the
uikit library locally, there are a couple options outlined here:

### Option 1 - Download uikit library (optional installation)
1. Download (or clone) uikit library from github: https://github.com/uikit/uikit/releases/tag/v3.23.6
2. Place uikit library in `<web root directory>/libraries/uikit`

### Option 2 - Composer require uikit library (optional installation)
1. Copy the following into your project's composer.json
```
"repositories": [
  {
    "type": "package",
    "package": {
      "name": "library/uikit",
      "version": "v3.23.6",
      "type": "drupal-library",
      "source": {
        "url": "https://github.com/uikit/uikit.git",
        "type": "git",
        "reference": "v3.23.6"
      }
    }
  }
]
```
2. Ensure you have following mapping inside your composer.json.
```
"extra": {
  "installer-paths": {
    "web/libraries/{$name}": ["type:drupal-library"]
  }
}
```
3. Require the library: `composer require library/uikit`

## Optional Config Notes

### Browse Exhibits View

The included `config/optional/views.view.exhibits.yml` does not create a menu
link for the `/exhibits` path, because that would add a dependency on a given
menu. Therefore, if you would like to use that view page and have it included
in some menu, you can edit the view at
`<your-site.com>/admin/structure/views/view/exhibits/edit/page_1`
assuming you have the dependencies to allow that view to be imported when
enabling this module.

### Exhibit Content Type

TODO: Fill this out

### Included Single Directory Components

This module provides Single Directory Components based on UIKit, and in
`/templates` there are twig templates that allow the Paragraph types and
the Exhibit node bundle in optional config to be displayed using these
components. You could create your own custom templates to make use of those
components if you cannot (or prefer not to) use the fields and Paragraphs
in the optional config.

For info on just the components, see each of the components in the `components`
directory of this module. The README.md files in each component might be
sparse, but should at least include a link to relevant sections of UIKit's
documentation.

### Included Paragraph Types

The Paragraph types, Exhibit content type, and dependencies in the optional
config in this module are provided as examples and are kept as optional to
provide the freedom to ignore any or all of the configurations while still
being able to make use of the single directory components in your own custom
templates. If you would like to use the Paragraph types directly or as
reference to make your own, this section gives an overview.

#### Embedded Repository Item (`embeded_repository_item`)
- A Paragraph type that allows for embedding a repository item, specifying
an image style for the item's thumbnail that links to the item, and setting
an optional caption to display under the thumbnail.
- This does not make use of any included components or UIKit styling, and is
not expected to be usable outside of the Islandora ecosystem, but could be used
as a reference to make something similar if desired.
- By default, this Paragraph is configured to just use `field_entity_embed`
which is a formatted text field using the `full_html_embed` text format which
allows the configuration for this Paragraph type to be imported even if the
`islandora_object` node bundle required by `field_repository_item` is not
present.
- If the dependencies for the other fields are met, you can configure them
at `<yoursite.com>/admin/structure/paragraphs_type/embeded_repository_item/form-display`
and `<yoursite.com>/admin/structure/paragraphs_type/embeded_repository_item/display`
by disabling `field_entity_embed` and instead using `field_repository_item`,
`field_embedded_caption`, and `field_entity_reference_display_m`.
- The only thing available to `field_entity_embed` that isn't available
with the other fields, is setting the alignment of the embedded item. Using
`field_entity_embed` allows you to set alignment to left, center, or right,
while using the other fields just aligns the item to center.

#### Section (`layout`)
- By default, only a single column layout is enabled, but more can be used
if available at `<yoursite.com>/admin/structure/paragraphs_type/layout`.
- This kind of Paragraph is like a display container for other Paragraph
types, and allows Exhibit content creators/editors to drag entire sections of
content to reorder information as desired.
- No special template, component, or UIKit styling associated with this one.

#### UIKit Slideshow (`uikit_slideshow`) & Slideshow Slide (`slideshow_slide`)
- The UIKit Slideshow Paragraph can have a label and multiple Slideshow Slide
Paragraphs.
- Slideshow Slide Paragraphs can each have:
  - text content (optional)
  - an image (required)
  - specified position (defaults to title and text on bottom)
  - a title (required)
  - title link (optional if you would like the title to link somewhere)
- Related twig template: `templates/paragraph--uiki-slideshow.html.twig`
- Related components:
  - `components/slide`
  - `components/slideshow`

#### UIKit Card (`uikit_card`)
- A Paragraph type to display information using [UIKit's Card component](
  https://getuikit.com/docs/card) styling with fields included for:
  - title (required)
  - title link (optional if you would like the title to link somewhere)
  - card body (optional text content)
  - size modifier (to choose to render as a large or small card)
  - image (optional image media)
  - media position (where to position image if included)
  - badge (optional text to display as a badge in the top right)
  - width class modifier (optional, could be any class, but intended to allow
  use of UIKit's [responsive width](
  https://getuikit.com/docs/width#responsive-width) classes.)
- Related twig template: `templates/paragraph--uikit-card.html.twig`
- Related component: `components/card`

#### UIKit Full HTML (`uikit_full_html`)
- A Paragraph type with a title field and an HTML markup field. The template
for this Paragraph type included in this module uses the `html` single
directory component which attaches the uikit library so those styles can be
applied to this Paragraph type.
- By default, the text format configured for the `field_uikit_html_markup`
field is pretty restricted to keep things simple, but you can add options and
styles to that format or configure a different text format with more element
options and styles to take advantage of the CSS classes from the UIKit
library.
- Related twig template: `templates/paragraph--uikit-full-html.html.twig`
- Related component: `components/html`

#### UIKit Grid (`uikit_grid`)
- A Paragraph type to display a grid of UIKit Card Paragraphs.
- Each UIKit Grid Paragraph can include:
  - title (optional)
  - gap modifier (see [UIKit's gap modifier documentation](
    https://getuikit.com/docs/grid#gap-modifiers))
  - divider modifier toggle (whether to include lines between items)
  - grid column counts for various breakpoints (number of columns, options
  are 1 to 6)
    - small, device widths from 640px to 960px. Grid columns will stack on
    smaller sizes.  (defaults to 1)
    - medium, device widths between 960px and 1200px (defaults to 3)
    - large, device widths between 1200px and 1600px (defaults to 5)
    - extra large, device widths larger than 1600px (defaults to 6)
  - as many UIKit Card grid items as you want to add
- Related twig template: `templates/paragraph--uikit-grid.html.twig`
- Related components:
  - `components/grid`
  - `components/card`

#### UIKit Heading (`uikit_heading`)
- A Paragraph type just for Heading elements that can make use of [UIKit's
Heading styles](https://getuikit.com/docs/heading), like the option to
include a divider, bullet styling, and a line modifier.
- Related twig template: `templates/paragraph--uikit-heading.html.twig`
- Related component: `components/heading`

#### UIKit Image and Text Display (`uikit_image_text_display`)
- A Paragraph type that is essentially a more simple/minimal kind of card
display that only has fields for a title, text content, and an image, with
no extra fields to add any styling or links.
- Related twig template: `templates/paragraph--uiki-image-text-display.html.twig`
- Related component: `components/image_text_display`

#### UIKit Nav (`uikit_nav`) & UIKit Nav Item (`uikit_nav_item`)
- A Paragraph type to include one or more expandable lists of links. These
links could be entered manually, or autogenerated based on UIKit Heading
Paragraphs present on the same page to make a table of contents.
- Related twig template: `templates/paragraph--uikit-nav.html.twig`
- Related component: `components/nav`

#### UIKit Quote (`uikit_quote`)
- A Paragraph type for very basic blockquote styling that includes an author
and the text being quoted.
- Related twig template: `templates/paragraph--uikit-quote.html.twig`
- Related component: `components/quote`

### Exhibit Text Formats

To configure any of these formats, assuming their dependencies are present and
the optional config yaml files have been imported, you can find them with the
rest of the filter formats at `<yoursite.com>/admin/config/content/formats`.

These text formats are included as optional config, but if you have other text
formats already configured and you would rather stick to those you can simply
disable and/or remove these:

- Exhibit basic html
  - This is expected to be used as the text format for fields that need the
  fewest formatting options; such as the Exhibit description field or the
  banner caption. The editor options included in this format are basics like
  bold, italicise, links, and a language selector in case the text is
  multilingual.
- Exhibit content basic html
  - This is intended for use in the 'Exhibit Content' Paragraph type,
  particularly in cases where users with access to create Exhibits shouldn't
  have access to full HTML formats with more complex options. It's more like a
  typical word processor, including all the same stuff as 'Exhibit basic html',
  plus list options, blockquote, horizontal divider, and you could add more in
  the editor configuration.
- Full HTML Embed
  - This one is mostly self-explanatory; it's a usual full HTML format that
  also includes widgets for embedding media and Islandora Repository Items.
  The 'Embedded Repository Item' Paragraph type can be configured to use
  either the Entity Reference field (`field_respository_item`) or the Formatted
  Text field (`field_entity_embed`), and this format is intended for use in
  `field_entity_embed`.
  - If you would like to minimize the use of different Paragraphs in favour of
  one HTML formatted text field, you could use this text format in the
  `uikit_full_html` Paragraph's `field_uikit_html_markup` field, and as long as
  you are comfortable working with HTML source editing you could use that one
  Paragraph type to accomplish almost the same results as all the other types
  since the twig template provided for that Paragraph type uses a component
  that includes the UIKit library which allows you to take advantage of many
  CSS classes.

## Maintainers/Sponsors

Current maintainers:

- discoverygarden

Sponsor:

- [Florida Department of State](https://dos.fl.gov/)
  - More specifically, [Division of Library and Information Services](https://dos.fl.gov/library-archives/)

## Development

If you would like to contribute to this module, create an issue, pull request, or contact discoverygarden.

## License
GPL-3.0-or-later
