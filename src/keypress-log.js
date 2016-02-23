/* global jQuery */
;( function( $, window, document, undefined ) {
	   "use strict";
    
		var pluginName = "keyPressLog",
			defaults = {
				keysLimit: 0 // Limit the maximum keys history length, 0 = no limit
			};

		function KeyPressLog ( element, options ) {
			this.$element = $(element);

			this.options = $.extend( {}, defaults, options );
			this._defaults = defaults;
			this._name = pluginName;
            this._keysLog = '';
			this._init();
		}
        
        function getChar(event) {
            if (event.which === null) { // IE
                if (event.keyCode < 32) {               
                    return null; // special symbol
                }
                return String.fromCharCode(event.keyCode);
            }

            if (event.which !== 0 && event.charCode !== 0) { // except IE
                if (event.which < 32) {                 
                    return null; // special symbol
                }
                return String.fromCharCode(event.which);
            }

            return null; // special symbol
        }

		$.extend( KeyPressLog.prototype, {
			_init: function() {
				this._bind();
			},
            get: function(){
                return this._keysLog;
            },
			_bind: function() {
                var self = this,
                    opts = self.options;
				$( self.$element )
                    .off("keypress."+pluginName)
                    .on("keypress."+pluginName, function(event){
                       var sym = getChar(event);
                       if(sym !== null){
                           
                           var logEvent = $.Event('logChange.xt.'+pluginName);
                           self.$element.trigger(logEvent, { char: sym });
                           if (logEvent.isDefaultPrevented()) { return; }
                           
                           if(opts.keysLimit && self._keysLog.length+1 > parseInt(opts.keysLimit)){
                                self._keysLog = sym;
                           }
                           else {
                                self._keysLog+=sym;
                           }
                       
                           var logEndEvent = $.Event('logChanged.xt.'+pluginName);
                           self.$element.trigger(logEndEvent, {char: sym, log: self._keysLog });
                       } 
                    });
			},
            destroy: function(){
                this.$element.off("keypress."+pluginName);
                this.$element.data('xt.'+pluginName, null);
            }
		} );

		$.fn[ pluginName ] = function( option ) {
			this.each( function() {
                var $this = $(this);
                var data = $this.data('xt.'+pluginName );
				if ( !data ) {
					$this.data('xt.'+pluginName, (data = new KeyPressLog( this, typeof option === 'object' &&  option)));
				}
                if (typeof option === 'string' && !option.startsWith("_")) {      
                    data[option].call(data);
                }
			} );
		};

} )( jQuery, window, document );