window.toast = (function(window, document) {
    var head = document.getElementsByTagName('head')[0];

    var createNode = function(type, attributes) {
        var node = document.createElement(type);

        if (attributes) {
            for (var property in attributes) {
                node[property] = attributes[property];
            }
        }

        return node;
    };

    var toast = function(resources, callback) {
        var pending;

        var isComplete = function() {
            if (!--pending && callback && callback() === false) {
                setTimeout(isComplete);
            }
        };

        var watchStyleSheet = function(node) {
            if (node.sheet || node.styleSheet) {
                isComplete();
            } else{
                setTimeout(function() {
                    watchStyleSheet(node);
                });
            }
        };

        var watchScript = function() {
            if (/ded|co/.test(window.readyState)) {
                isComplete();
            }
        };

        if (head || setTimeout(toast)) {
            if (!resources.pop) {
                resources = [resources];
            }

            pending = resources.length;

            for (var i = 0; i < resources.length; i++) {
                var resource = resources[i];
                var attributes = {};
                var href = resource.href || resource.src || resource;
                var node;

                if (typeof resource == 'object') {
                    for (var property in resource) {
                        attributes[property] = resource[property];
                    }
                }

                if (/\.css$/.test(href)) {
                    attributes.rel = 'stylesheet';
                    attributes.href = href;

                    node = createNode('link', attributes);

                    watchStyleSheet(node);
                } else {
                    attributes.src = href;

                    node = createNode('script', attributes);

                    if (node.onreadystatechange === null) {
                        node.onreadystatechange = watchScript;
                    } else {
                        node.onload = isComplete;
                    }
                }

                head.appendChild(node);
            }
        }
    };

    return toast;
})(this, this.document);