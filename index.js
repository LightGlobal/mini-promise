(function(context, factory){
    'use strict';

    if (typeof exports === 'object') {
        // CommonJS
        module.exports = factory();
    } else {
        // Global Variables
        context.UEM = context.UEM || {};
        context.UEM.promise = factory();
    }

})(window, function(){
    'use strict';

    function Promise(cb){
        this.cb = cb;
        this.state = 'pending';
        this.thenable = [];
        this.lastResult = '';

        // 
        // 

        this.cb(function(){
            this.resolve();
        }.bind(this), function(){
            this.reject();
        }.bind(this));

    }

    Promise.prototype.resolve = function () {
        this.state = 'fulfilled';
        this._executeThenable();
    };

    Promise.prototype.reject = function () {
        this.state = 'rejected';
        this._executeThenable();
    };

    Promise.prototype.then = function(resolveCb, rejectCb){
        this.thenable.push({
            resolve: resolveCb || function(){},
            reject: rejectCb || function(){}
        });

        return this;

    };

    Promise.prototype._executeThenable = function () {
        if(this.state === 'pending') {
            return;
        }

        for(var i = 0, n = this.thenable.length; i<n; i++) {
            if(this.state === 'fulfilled') {
                try {
                    this.lastResult = this.thenable[i].resolve.call(this, this.lastResult);
                } catch (e) {
                    this.lastResult = e;
                    this.state = 'rejected';
                }
            } else {
                try {
                    this.lastResult = this.thenable[i].reject.call(this, this.lastResult);
                } catch (e) {
                    this.lastResult = e;
                    this.state = 'rejected';
                }
            }
        }
    };


    return Promise;


});