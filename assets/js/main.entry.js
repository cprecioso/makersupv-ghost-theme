var u = require("umbrellajs").u
var swal = require("sweetalert")

// Lazy load images
var loaded = false
function lazyload() {
  if (!loaded) {
    loaded = u("img.lazy").each(function (node) {
      u(node).attr("src", u(node).attr("data-src"))
    })
  }
}
u([window]).on("scroll", lazyload)
var body = u("body")
u([window]).on("scroll", function (e) {
  u("nav").toggleClass("active", body.size().top < -10)
})

// Filter the different parts with the buttons
function reloadParts() {
  var checked = []
  u(".category input:checked").each(function (data) {
    checked.push(u(data).attr("data-type"))
  })

  u("article").each(function (article) {
    u(article).addClass("hidden")

    if (checked.length === 0) {
      u(article).removeClass("hidden")
    }

    checked.forEach(function (one) {
      if (u(article).hasClass("tag-" + one)) {
        lazyload()
        u(article).removeClass("hidden")
      }
    })
  })
}

u(".category input").on("change", reloadParts)
reloadParts()

u("#contacto form").ajax(
  function (err, data) {
    console.log(err, data)
    if (err) {
      swal(
        "Oops!",
        "Algo ha fallado, por favor contáctanos en contacto" +
        "@" +
        "makersupv.com",
        "error"
      )
    } else {
      swal(
        "Enviado!",
        "Nos pondremos en contacto tan pronto como sea posible",
        "success"
      )
      u("#contact form")
        .first()
        .reset()
    }
  },
  function () {
    u('[name="_cc"]').first().value =
      "public" + "francisco" + "@" + "hotmail.com"
  }
)
