# Exhibit Components
Drupal module containing Single Directory Components for use in exhibit content.

## Intro
Each component in the `components` directory is used by a paragraph template in the `templates` directory,
and the necessary configuration for the paragraph entities and their fields should be included in this module's
`config` directory. As long as you have a content type set up to use any of the included paragraphs, those
paragraphs should get displayed using the relevant template and component.

## Libraries
By default, this module uses CDNs for the uikit js and css libraries,
but it will use locally installed libraries when possible.

Defaulting to CDNs is convenient for quickly installing and doing some preliminary testing,
but it is not recommended to rely on CDNs; to install the uikit library locally, there are a couple options outlined here: 

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

## Maintainers/Sponsors

Current maintainers:

- discoverygarden

## Development

If you would like to contribute to this module, create an issue, pull request, or contact discoverygarden.

## License
GPL-2.0-or-later
