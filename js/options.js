(function() {
  var textarea = document.getElementById('textarea');
  var form = document.getElementById('form');
  form.addEventListener('submit', function(e) {
    var value = textarea.value;
    try {
      if (value != '') {
        JSON.parse(value); // syntax check
      }
      localStorage['config'] = value;
    } catch (ex) {
      alert(ex);
    }
    e.preventDefault();
    return false;
  }, false);

  var config = localStorage['config'];
  if (!config) {
    config = '[\n'
           + '  {\n'
           + '    "bitbucketPrefix": "https://bitbucket.org/redmine/",\n'
           + '    "redmineRoot": "https://redmine.org/"\n'
           + '  }\n'
           + ']';
  }
  textarea.value = config;
})();
