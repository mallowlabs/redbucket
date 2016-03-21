(function() {
  chrome.extension.sendMessage(
    {},
    function(config) {
      var redmine = 'https://redmine.org/'
      var loc = window.location.toString();
      for (var i = 0, l = config.length; i < l; i++) {
        if (loc.startsWith(config[i].bitbucketPrefix)) {
          redmine = config[i].redmineRoot;
          break;
        }
      }
      redmine = redmine.replace(/\/$/, '');

      var target = document.querySelector('.pjax');
      if (target != null) {
        var observer = new MutationObserver(function(mutations, self) {
          mutations.forEach(function(mutation) {
            if (mutation.type === 'childList') {
              addLinks(config);
            }
          });
        });
        observer.observe(target, {
          childList: true,
          subtree: false
        });
      }

      var addLinks = function(config) {
        var subjects = document.querySelectorAll('.subject, .commit-message > p');

        for (var i = 0, l = subjects.length; i < l; i++) {
          var content = subjects[i];
          var innerHTML = content.innerHTML;
          var issues = innerHTML.match(/#[0-9]+/g);
          if (content == null || issues == null) {
            continue
          }
          for (var j = 0, m = issues.length; j < m; j++) {
            var issueId = issues[j].replace(/#/, '');
            var link = '<a href="' + redmine + '/issues/' + issueId + '" target="_blank">' + issues[j] + '</a>';
            content.innerHTML = innerHTML.replace(issues[j], link);
          }
        }
      };
      addLinks(config);
    }
  );
})();
