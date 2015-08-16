# EventHand
Simplest event manager.

###Creating

```javascript
//creating an instance
var space = new EventHand();
```

###Methods

##### `on`

Subscribes to an event.
```javascript
space.on( 'Some event', function( data ) {
  //process data
} );
```

##### `off`

Unsubscribes to an event.
```javascript
space.off( 'Some event' );
```

##### `trigger`

Publishes event.
```javascript
space.trigger( 'Some event', {
  //some data
} );
```

###Example
```javascript
var model = new function() {
  var that = this;

  EventHand.call( this );
  
  this.setValue = function( value ) {
    that.trigger( 'Value is set', {
      value: value
    } );
  }
};

var view = new function() {
  var that = this,
      $button = $( '.button' ),
      $display = $( '.display' );
      
  EventHand.call( this );
  
  $button.on( 'click', function() {
    that.trigger( 'Button is clicked', {
      value: 123
    } );
  } );
  
  this.setDisplayValue = function( value ) {
    $display.text( value );
  };
};

var controller = new function() {
  view.on( 'Button is clicked', function( data ) {
    model.setValue( data.value );
  } );
  
  model.on( 'Value is set', function( data ) {
    view.setDisplayValue( data.value );
  } );
};
```
