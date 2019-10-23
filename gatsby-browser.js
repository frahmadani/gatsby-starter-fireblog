// custom typefaces
import "typeface-roboto"
import "./content/assets/main.css"

export const onRouteUpdate = () => {
  if (!window.iframely) return

  document.querySelectorAll('oembed[url]').forEach((element) => {
    window.iframely.load(element, element.attributes.url.value)
  })
}
