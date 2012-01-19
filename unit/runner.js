domReady(function(){

    sink('toast',function(test,ok,before,after){

        test('One resource',2,function(){
            // One JS resource
            toast(
                'resources/a.js',
                function(){
                    if(!window.a) return false;
                    ok(true,'One JS resource loaded');
                }
            );
            // One CSS resource
            toast(
                'resources/a.css',
                function(){
                    ok(document.styleSheets.length==1,'One CSS resource loaded');
                }
            );
        });

        test('Several resources',2,function(){
            toast(
                [
                    'resources/b.js',
                    'resources/b.css',
                    'resources/c.js',
                    'resources/c.css'
                ],
                function(){
                    if(!window.b && !window.c) return false;
                    ok(true,'Four JS resources loaded');
                    ok(document.styleSheets.length==3,'Two CSS resources loaded');
                }
            );
        });

        test('One complex resource',2,function(){
            // One JS resource
            toast(
                {href: 'resources/f.js', id: 'foo'},
                function(){
                    if(!window.f) return false;
                    ok(true,'One JS resource loaded');
                }
            );
            // One CSS resource
            toast(
                {src: 'resources/f.css', media: 'only screen and (max-device-width: 480px)'},
                function(){
                    ok(document.styleSheets.length==4,'One CSS resource loaded');
                }
            );
        });
    });

    start();

});
