(function ($) {
  module('Init plugin', {
    setup: function () {
      this.elems = $('#qunit-fixture').children();
    }
  });

  test('Has jquery plugin', function () {
    expect(this.elems.length);
    this.elems.keyPressLog();
        $.each(this.elems, function(){
            ok($(this).data("xt.keyPressLog") != null, "Element not has plugin");
        });    
  });
}(jQuery));
