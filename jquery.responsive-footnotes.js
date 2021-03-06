// Generated by CoffeeScript 1.6.3
(function() {
  var Footnotify;

  Footnotify = {
    config: {
      link: "sup.fnify-ref",
      note: "span.fnify-note",
      holder: ".footnotes",
      refIdStem: "fnify-ref-",
      noteIdStem: "fnify-note-"
    },
    getElements: function() {
      return {
        $links: $(this.config.link),
        $notes: $(this.config.note),
        $holder: $(this.config.holder)
      };
    },
    el: {},
    setupRefs: function(links) {
      var noteStem, refStem;
      noteStem = this.config.noteIdStem;
      refStem = this.config.refIdStem;
      return links.each(function(i) {
        return $(this).html("[" + (i + 1) + "]").wrap("<a href='#" + noteStem + (i + 1) + "'>").attr("id", "" + refStem + (i + 1));
      });
    },
    setupNotes: function(notes) {
      var noteStem, refStem;
      noteStem = this.config.noteIdStem;
      refStem = this.config.refIdStem;
      return notes.each(function(i) {
        return $(this).prepend("<sup><a href='#" + refStem + (i + 1) + "'>[" + (i + 1) + "]</a></sup> ").attr({
          id: "" + noteStem + (i + 1)
        }).appendTo(Footnotify.config.holder).wrap("<li>");
      });
    },
    calcOffsets: function(links, notes, holder) {
      var holderTop, i, lowestNote, noteTop, refTop, _results;
      holderTop = holder.offset().top;
      i = 0;
      lowestNote = 0;
      _results = [];
      while (i < notes.length) {
        refTop = links.eq(i).offset().top;
        if (refTop < holderTop) {
          if (refTop < lowestNote) {
            noteTop = lowestNote;
          } else {
            noteTop = holderTop;
          }
        } else {
          if (refTop < lowestNote) {
            noteTop = lowestNote;
          } else {
            noteTop = refTop;
          }
        }
        notes.eq(i).parent("li").css("top", noteTop);
        lowestNote = notes.eq(i).offset().top + notes.eq(i).height();
        _results.push(i++);
      }
      return _results;
    },
    uiBind: function() {
      var _this = this;
      return $(window).bind('resize', function() {
        return _this.calcOffsets(_this.el.$links, _this.el.$notes, _this.el.$holder);
      });
    },
    init: function(config) {
      var el;
      if (config && typeof config === 'object') {
        $.extend(this.config, config);
      }
      el = this.el = this.getElements();
      if (el.$links.length !== el.$notes.length) {
        console.warn("Note/ref length mismatch.");
      }
      this.setupRefs(el.$links);
      this.setupNotes(el.$notes, el.$links);
      this.calcOffsets(el.$links, el.$notes, el.$holder);
      return this.uiBind();
    }
  };

  Footnotify.init();

}).call(this);
