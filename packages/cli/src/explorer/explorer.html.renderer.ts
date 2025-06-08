import { EntityLocation } from '../validate-refs/entity.registry.js';

export class EntityExplorerHtmlRenderer {
  constructor(
    private readonly srcDir: string,
    private readonly explorerView: EntityLocation[]
  ) {}

  toHtml() {
    return `<html lang="en">
      <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Document</title>
          <link
            rel="stylesheet"
            href="https://cdn.jsdelivr.net/npm/@picocss/pico@2/css/pico.min.css"
          >
          <style>
            .entity { border: 1px solid red; }
          </style>
      </head>
      <body>
          <h1>Entity Explorer</h1>
          <h2>Monsters</h2>

          <ul>
          ${this.explorerView
            .map((loc) => {
              const spriteLoc = (loc.entity.sprite as EntityLocation[])[0];
              const imgData = spriteLoc
                ? {
                    width: spriteLoc.entity.width,
                    height: spriteLoc.entity.height,
                    texture: spriteLoc.entity.texturename,
                    xloc: spriteLoc.entity.xloc,
                    yloc: spriteLoc.entity.yloc,
                  }
                : { width: 80, height: 128, texture: 'default' };
              return `
              <li class="entity"> 
                <div style="background-image: url('${this.srcDir}/textures/${
                imgData.texture
              }.png'); width: ${imgData.width}px; height: ${
                imgData.height
              }px; background-position: -${imgData.xloc}px -${
                imgData.yloc
              }px;"></div>
                  <h3>${loc.entity.name}</h3>
                  <a href="${loc.filepath}">View source</a>
                  <p>identifier: ${loc.name}</p>
                  <pre>${Object.entries(loc.entity)
                    .map(
                      ([key, val]) => `${key}: ${JSON.stringify(val, null, 2)}`
                    )
                    .join('\n')}</pre>

                </li>
            `;
            })
            .join('\n')}
          </ul>
      
      </body>
      </html>
`;
  }
}
