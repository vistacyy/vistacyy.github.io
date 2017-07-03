//表单序列化
$().extend('serialize', function () {
  for (var i = 0; i < this.elements.length; i ++) {
    var parts = {};
    var field = null;
    var form = this.elements[i];
    for (var k = 0; k < form.elements.length; k ++) {
      field = form.elements[k];
      switch (field.type) {
        case 'select-one' :
        case 'select-multiple' :
        for (var j = 0; j < field.options.length; j++) {
          var option = field.options[j];
          if (option.selected) {
            var optValue = '';
            if (option.hasAttribute) {
              optValue = (option.hasAttribute('value') ?option.value : option.text);
            } else {
              optValue = (option.attributes['value'].specified ?option.value:option.text);
            }
            parts[field.name] = optValue;
          }
        }
          break;
        case undefined :
        case 'file' :
        case 'submit' :
        case 'reset' :
        case 'button' :
          break;
        case 'radio' :
        case 'checkbox' :
          if (!field.checked) {
            break;
          }
        default :
          parts[field.name] = field.value;
      }
    }
    return parts; 
  }
  return this;
});