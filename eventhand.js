( function( window, undefined ) {
    var EventHand = function() {
        this._every_alias = '*';
        this._reset();
    };
    
    EventHand.prototype._reset = function() {
        this._events = [];
        this._events_length = 0;
    };
    
    EventHand.prototype.on = function( name, callback ) {
        this._events[ this._events_length++ ] = {
            name: name,
            callback: callback
        };
    };
    
    EventHand.prototype.one = function( name, callback ) {
        this.on( name, function( data, current_name, that ) {
            callback( data, current_name, that );
            that.off( name );
        } );
    };
    
    EventHand.prototype.off = function( name ) {
        if ( name === this._every_alias ) {
            this._reset();
        } else {
            this._events = this._events.filter( function( item ) {
                return item.name !== name;
            } );
            
            this._events_length = this._events.length;
        }
    };
    
    EventHand.prototype.trigger = function( name, data ) {
        var i,
            item,
            item_name;
        
        for ( i = 0; i < this._events_length; i++ ) {
            item = this._events[ i ];
            item_name = item.name;
            
            if ( item_name === name || item_name === this._every_alias || name === this._every_alias ) {
                item.callback( data, item_name, this );
            }
        }
    };
    
    window.EventHand = window.EventHand || EventHand;
} )( window );
