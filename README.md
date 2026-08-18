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

### UIKit Paragraphs and Components

This module provides Single Directory Components based on UIKit, and in
`/templates` there are twig templates that allow the Paragraph types and
the Exhibit node bundle in optional config to be displayed using these
components. You could create your own custom templates to make use of those
components if you cannot (or prefer not to) use the fields and Paragraphs
in the optional config.

For info on just the components, see the README.md files in each of the
components in the `components` directory of this module.

Here is an overview of the Paragraphs included in optional config:

- Embedded Repository Item
- Section (`layout`)
- Slideshow Slide
- UIKit Card
- UIKit Full HTML
- UIKit Grid
- UIKit Heading
- UIKit Image and Text Display
- UIKit Nav
- UIKit Nav Item
- UIKit Quote
- UIKit Slideshow

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
