/**
 * Main JS file for Casper behaviours
 */

/* globals jQuery, document */
(function ($, sr, undefined) {
    "use strict";

    var $document = $(document),

        // debouncing function from John Hann
        // http://unscriptable.com/index.php/2009/03/20/debouncing-javascript-methods/
        debounce = function (func, threshold, execAsap) {
            var timeout;

            return function debounced () {
                var obj = this, args = arguments;
                function delayed () {
                    if (!execAsap) {
                        func.apply(obj, args);
                    }
                    timeout = null;
                }

                if (timeout) {
                    clearTimeout(timeout);
                } else if (execAsap) {
                    func.apply(obj, args);
                }

                timeout = setTimeout(delayed, threshold || 100);
            };
        };

    $document.ready(function () {

        var $postContent = $(".post-content, .jb-post-content");
        $postContent.fitVids();

        $(".jb-post-content img").attr({
            loading: "lazy",
            decoding: "async"
        });

        function updateImageWidth() {
            var $this = $(this),
                contentWidth = $postContent.outerWidth(), // Width of the content
                imageWidth = this.naturalWidth; // Original image resolution

            if (!contentWidth) {
                return;
            }

            if (imageWidth >= contentWidth) {
                $this.addClass('full-img');
            } else {
                $this.removeClass('full-img');
            }
        }

        var $img = $("img").on('load', updateImageWidth);
        function casperFullImg() {
            $img.each(updateImageWidth);
        }

        casperFullImg();
        $(window).smartresize(casperFullImg);

        $(".scroll-down").arctic_scroll();

        function setupInfiniteScroll() {
            var posts = document.querySelector(".jb-posts"),
                pagination = document.querySelector(".pagination"),
                status = document.querySelector(".jb-infinite-status"),
                nextLink = pagination && pagination.querySelector(".older-posts"),
                loading = false;

            if (!posts || !pagination || !status || !nextLink || !("IntersectionObserver" in window) || !window.fetch || !window.DOMParser) {
                if (status) {
                    status.style.display = "none";
                }
                return;
            }

            document.body.classList.add("has-infinite-scroll");
            status.textContent = "Scroll for older posts";

            function nextUrl() {
                return nextLink && nextLink.getAttribute("href");
            }

            function loadNextPage() {
                var url = nextUrl();

                if (!url || loading) {
                    return;
                }

                loading = true;
                status.classList.add("is-loading");
                status.textContent = "Loading older posts...";

                fetch(url, { credentials: "same-origin" })
                    .then(function(response) {
                        if (!response.ok) {
                            throw new Error("Unable to load " + url);
                        }
                        return response.text();
                    })
                    .then(function(html) {
                        var doc = new DOMParser().parseFromString(html, "text/html"),
                            newPosts = doc.querySelectorAll(".jb-post-row"),
                            newNext = doc.querySelector(".older-posts");

                        newPosts.forEach(function(post) {
                            posts.appendChild(document.importNode(post, true));
                        });

                        nextLink = newNext;

                        if (!newPosts.length || !nextLink) {
                            observer.disconnect();
                            status.textContent = "End of archive";
                            status.classList.remove("is-loading");
                            status.classList.add("is-done");
                            return;
                        }

                        status.textContent = "Scroll for older posts";
                        status.classList.remove("is-loading");
                    })
                    .catch(function() {
                        observer.disconnect();
                        pagination.classList.add("is-visible");
                        status.textContent = "Could not load more posts";
                        status.classList.remove("is-loading");
                    })
                    .then(function() {
                        loading = false;
                    });
            }

            var observer = new IntersectionObserver(function(entries) {
                if (entries.some(function(entry) { return entry.isIntersecting; })) {
                    loadNextPage();
                }
            }, { rootMargin: "700px 0px" });

            observer.observe(status);
        }

        setupInfiniteScroll();

    });

    // smartresize
    jQuery.fn[sr] = function(fn) { return fn ? this.bind('resize', debounce(fn)) : this.trigger(sr); };

    // Arctic Scroll by Paul Adam Davis
    // https://github.com/PaulAdamDavis/Arctic-Scroll
    $.fn.arctic_scroll = function (options) {

        var defaults = {
            elem: $(this),
            speed: 500
        },

        allOptions = $.extend(defaults, options);

        allOptions.elem.click(function (event) {
            event.preventDefault();
            var $this = $(this),
                $htmlBody = $('html, body'),
                offset = ($this.attr('data-offset')) ? $this.attr('data-offset') : false,
                position = ($this.attr('data-position')) ? $this.attr('data-position') : false,
                toMove;

            if (offset) {
                toMove = parseInt(offset);
                $htmlBody.stop(true, false).animate({scrollTop: ($(this.hash).offset().top + toMove) }, allOptions.speed);
            } else if (position) {
                toMove = parseInt(position);
                $htmlBody.stop(true, false).animate({scrollTop: toMove }, allOptions.speed);
            } else {
                $htmlBody.stop(true, false).animate({scrollTop: ($(this.hash).offset().top) }, allOptions.speed);
            }
        });

    };
})(jQuery, 'smartresize');
