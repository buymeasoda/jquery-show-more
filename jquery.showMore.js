(function ($) {

    function ShowMore(summary, settings) {
        summary = $(summary);
        this.settings = settings;
        this.el = {
            summary: summary,
            content: summary.wrapInner('<div>').children().css('display', 'inline-block'),
            button: $(settings.template.button, {
                'text': settings.text.showMore,
                'class': settings.cssClass.button,
                'click': $.proxy(this.toggle, this)
            })
        };
        this.isOpen = false;
        this.init();
    }

    $.extend(ShowMore.prototype, {
        init: function () {
            this.summaryHeight = this.el.summary.height();
            this.update();
            this.el.button.insertAfter(this.el.summary);
        },
        update: function () {
            this.contentHeight = this.el.content.height();
            if (this.contentHeight <= this.summaryHeight) {
                this.el.summary.height('auto');
                this.el.button.hide();
            } else {
                this.el.summary.height(this.isOpen ? this.contentHeight : this.summaryHeight);
                this.el.button.show();
            }
        },
        toggle: function () {
            this.el.summary.stop().animate({
                height: this.isOpen ? this.summaryHeight : this.contentHeight
            }, this.settings.speed);
            this.el.button.text(this.settings.text[this.isOpen ? 'showMore' : 'showLess']);
            this.isOpen = !this.isOpen;
        },
        open: function () {
            this.isOpen = false
            this.toggle();
        },
        close: function () {
            this.isOpen = true;
            this.toggle();
        }
    });

    $.fn.showMore = function (options) {
        var settings = $.extend({}, $.fn.showMore.defaults, options);
        return this.each(function () {
            if (!$.data(this, 'sodaShowMore')) {
                $.data(this, 'sodaShowMore', new ShowMore(this, settings));
            }
        });
    };

    $.fn.showMore.defaults = {
        text: {
            showMore: 'Show more',
            showLess: 'Show less'
        },
        template: {
            button: '<div></div>'
        },
        cssClass: {
            button: 'read-more'
        },
        speed: 300
    };

}(jQuery));