function showMore(container, id_post = false) {
  if (id_post == "119354" || id_post == "125442") {
      return false;
  }
  var post = document.querySelector(container),
    pos = 0,
    old = false;

  if (
    id_post == "66112" ||
    id_post == "82657" ||
    id_post == "84073" ||
    id_post == "92461" ||
    id_post == "103122" ||
    id_post == "119954" ||
    id_post == "123941" ||
    id_post == "125314"  //Todo TEST
  ) {
    old = true;
  }
  if (post) {
    showNextPath();
  }
  function showNextPath(index) {
    var counter = 0,
      children = post.children,
      index = index ? index : 0,
      button,
      next;

    if (old) {
      if (!pos) {
        for (var i = 0; i < children.length; i++) {
          if (children[i].querySelector("h2")) {
            children[i].insertAdjacentElement("afterend", buttonElem(i));
            i++;
            continue;
          }
          children[i].classList.add("stk-grid_hidden");
        }
      }
    } else {
      if (!pos) {
        var show = "";
        for (var i = 0; i < children.length; i++) {
          if (children[i].querySelector(".hide-start")) {
            show = "none";
            children[i].insertAdjacentElement("afterend", buttonElem(i));
            i++;
            continue;
          }
          if (children[i].querySelector(".hide-end")) {
            show = "";
          }
          children[i].style.display = show;
        }
      }
    }

    button = pos ? getButton(index) : children[0];

    if (old) {
      if (button) {
        next = button.nextElementSibling;
        while (next && !next.querySelector("h2")) {
          next.classList.remove("stk-grid_hidden");
          next = next.nextElementSibling;
        }
      }
    } else {
      if (button) {
        next = button.nextElementSibling;
        while (
          next &&
          !next.querySelector(".hide-start") &&
          !next.querySelector(".hide-end")
        ) {
          next.style.display = "";
          next = next.nextElementSibling;
        }
      }
    }

    if (pos && index !== undefined) {
      removeButtonElem(index);
    }

    pos++;
  }

  function removeButtonElem(index) {
    if (old) {
      var buttonElems = post.querySelectorAll(".show-next-path"),
        button;
    } else {
      var buttonElems = post.querySelectorAll(".show-next-path-new"),
        button;
    }

    if (index) {
      button = post.querySelector('[data-index="' + index + '"]').parentNode;
      button.parentNode.removeChild(button);
      return;
    }

    for (var i = 0, size = buttonElems.length; i < size; i++) {
      buttonElems[i].parentNode.removeChild(buttonElems[i]);
    }
  }

  function getButton(index) {
    var button = post.querySelector('[data-index="' + index + '"]');
    if (!button) {
      return;
    }
    var outer = button.parentNode;
    return outer;
  }

  function buttonElem(index) {
    var buttonElem, link, sprite;

    buttonElem = document.createElement("p");
    link = document.createElement("a");
    sprite = document.createElement("span");
    text = sprite.cloneNode();

    if (index !== undefined) {
      link.setAttribute("data-index", index);
    }
    if (old) {
      buttonElem.classList.add("show-next-path");
    } else {
      buttonElem.classList.add("show-next-path-new");
    }

    link.classList.add("journal-more_link");
    sprite.classList.add("mainsprite-more");
    text.classList.add("text");

    text.innerText = "Читать полностью";

    link.appendChild(text);
    link.appendChild(sprite);
    buttonElem.appendChild(link);

    buttonElem.addEventListener(
      "click",
      function(event) {
        event.preventDefault();
        showNextPath(
          parseInt(event.target.closest("a").getAttribute("data-index"))
        );
      },
      false
    );
    return buttonElem;
  }
}

var idxNextPost = 1;
var classNextPost = "";
var setkaContent, counChildElements, childCollections, id_post;

$(document).ajaxComplete(function(event, request, settings) {
  if (settings.url.search(/_next.html/i) !== -1) {
    idxNextPost++;
    classNextPost = ".i" + idxNextPost;
    setkaContent = $(classNextPost + " .stk-post");
    id_post = $(classNextPost + " .stk-post")
      .parent()
      .attr("data-post-id");
    counChildElements = setkaContent.children().length;
    childCollections = setkaContent.children();
    $("figure").contents().filter(function () {
     return this.nodeType === 3;
    }).remove();
    hideContent();
  }
});

function hideContent() {
  if (document.documentElement.clientWidth > 1024) {
    if (
      $(setkaContent)
        .parent()
        .is(".setka-content-3")
    ) {
        if (childCollections.length > 7) {
            $(childCollections).each(function(idx, el) {
              if (idx > 3 && (($(el).is('p') && $(el).is('.stk-reset')) || $(el).find('p').is('.stk-reset'))) {
                $(el).after(
                  '<div class="hide-wrapper"><div class="hide-start"></div></div>'
                );
                return false;
              }
            });
            showMore(classNextPost + " .stk-post", id_post);
        }
    }
  } else {
      if (childCollections.length > 7) {
          $(childCollections).each(function(idx, el) {
            if (idx > 3 && (($(el).is('p') && $(el).is('.stk-reset')) || $(el).find('p').is('.stk-reset'))) {
              $(el).after(
                '<div class="hide-wrapper"><div class="hide-start"></div></div>'
              );
              return false;
            }
          });
          showMore(classNextPost + " .stk-post", id_post);
      }
  }
}

showMore(".stk-post");
