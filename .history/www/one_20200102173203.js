        const fxCodex = {
            smoke     : {canvasCount : 24, duration : 2.00, animationStagger : 200, blur : 2.8, translateX :  500, translateY :    0, rotation:    0, jitterBlur : 0, jitterTranslateX : 15, jitterTranslateY : 15, jitterRotation : 300}
           ,dust      : {canvasCount : 24, duration : 2.00, animationStagger : 200, blur : 0.8, translateX :  200, translateY : -100, rotation:    0, jitterBlur : 0, jitterTranslateX : 35, jitterTranslateY : 35, jitterRotation :  10}
           ,dissolve  : {canvasCount : 24, duration : 0.50, animationStagger : 100, blur : 2.0, translateX :    0, translateY :    0, rotation:    0, jitterBlur : 0, jitterTranslateX : 15, jitterTranslateY : 15, jitterRotation :  10}
           ,dissapate : {canvasCount : 10, duration : 3.00, animationStagger : 100, blur : 5.0, translateX : -300, translateY : -100, rotation:    0, jitterBlur : 0, jitterTranslateX : 80, jitterTranslateY : 25, jitterRotation : 360}
           ,flush     : {canvasCount : 30, duration : 6.00, animationStagger :  10, blur : 0.0, translateX :    0, translateY :    0, rotation: 1540, jitterBlur : 0, jitterTranslateX :  0, jitterTranslateY :  0, jitterRotation : 180}
           ,inhale    : {canvasCount : 16, duration : 0.50, animationStagger :  10, jitterAnimationStagger : 5, scale: 0.95, jitterScale: '+0.5', blur: '0.25px', jitterBlur: '0.25px' }
           ,burst     : {direction: 'reverse', canvasCount : 16, duration : 0.25, jitterDuration : 0.125, animationStagger :  0, jitterAnimationStagger : 0, scale: 4.5, jitterScale:3, blur: '0.5px', jitterBlur: '0.5px', saturate:5, brightness:3, contrast:3, opacity:0,
           translateX : '40px', jitterTranslateX : '40px', translateY : '0px', jitterTranslateY : '60px',  }
       }

       /* cvx.style.transition = (1+ (Math.random() - 0.5)) * duration + 's all ease-out'
                    cvx.style.setProperty('--opacity',      0);
                    cvx.style.setProperty('--blur',         (0.5 * Math.random()) + 'px');
                    cvx.style.setProperty('--scale',        (3 * Math.random()) + 3);
                    cvx.style.setProperty('--translateX',   (40 * Math.random()) + 'px');
                    cvx.style.setProperty('--translateY',   (160 * Math.random())- 80 + 'px'); 
                    cvx.style.setProperty('--saturate',     5);
                    cvx.style.setProperty('--brightness',   3);
                    cvx.style.setProperty('--contast',      3);*/

       const codexDefaults = {
            animationSceneDelay : 0,                 canvasCount            : 8,                 
            duration            : 1000,              jitterDuration         : 0,
            animationOrigin     : 'middle',          animationDirection     : 'forwards',
            animationStagger    : 100,               jitterAnimationStagger : 0,
            blur                : 0,                 jitterBlur             : 0, 
            translateX          : 0,                 jitterTranslateX       : 0, 
            translateY          : 0,                 jitterTranslateY       : 0, 
            rotate              : 0,                 jitterRotate           : 0,
            scale               : 1,                 jitterScale            : 0,
            brightness          : 1,                 jitterBrightness       : 0,
            saturate            : 1,                 jitterSaturate         : 0,
            contrast            : 1,                 jitterContrast         : 0,
            opacity             : 1,                 jitterOpacity          : 0,
        },

        propertyCodex                 = [];
        propertyCodex['animation']    = ['canvasCount', 'duration', 'animationOrigin', 'animationStagger', 'jitterAnimationStagger'];
        propertyCodex['transform']    = ['translateX', 'translateY', 'rotate', 'scale'];
        propertyCodex['filter']       = ['blur', 'brightness', 'saturate', 'contrast', 'opacity'];
        propertyCodex['webkitFilter'] = propertyCodex['filter'];
        animationOrigins              = ['tl','t','tr','l','m','r','bl','b','br'];
        scaleFactor = 1;
        var backingScale = function () {
            if (window.devicePixelRatio && window.devicePixelRatio > 1) {
                return window.devicePixelRatio;
            }
            return 1;
        };
        var parsePixelValue = function (value) {
            return parseInt(value, 10);
        };

        var scaleCanvasForRetina = (canvas) => new Promise((resolve, reject) => {
            scaleFactor = backingScale(),
            canvas.width = parsePixelValue(canvas.width) / scaleFactor;
            canvas.height = parsePixelValue(canvas.height) / scaleFactor;
            resolve(drawHTML(canvas));
        });
        var drawHTML = function () {
            var scaleFactor = backingScale();
            rasterizeHTML.drawHTML(input.value, canvas, {
                zoom: scaleFactor
            });
        };
        

        var contentTarget = qs('.content'),
            contentMarkup = contentTarget.innerHTML,
            contentBndBox = contentTarget.getBoundingClientRect(),
            contentPosX   = contentBndBox.x + 'px',
            contentPosY   = contentBndBox.y + 'px',
            contentCntrX  = contentBndBox.x + (contentBndBox.width / 2) + 'px',
            contentCntrY  = contentBndBox.y + (contentBndBox.height / 2) + 'px',
            allCanvases   = null,
            activeCodex   = Object.assign({}, codexDefaults);
        
        let canvasContext, imageData, bitmap, canvasW, canvasH, pixelCt, pxlsSlc, slices, optimizedMap, pixelMaps, 
        
        
        animationChain  = [];
        numCanvases     = 12;

       
        var rndOffSet = ''
        var weights = [...new Array(4).fill(0), ...new Array(3).fill(1), 2,2,2];
        for(i=0; i<100; i++) rndOffSet += '|' + Math.floor(Math.random() * 100) + '|';
        rndOffSet = rndOffSet.replace(/\|(\d+?)\|/g, (m,r)=>`000${r},`.slice(-3)).split(',');

        const getWeightedArr = (tier, numCanvases) =>{
            let mr = ~~(Math.random() * 100), rndV;
            rndV = (rndOffSet.splice(mr,1))[0];
            rndOffSet.push(rndV)
            rndV=((mr*rndV) + '').replace(/\./,'').slice(-2) * (!(mr%2) ? 1 : -1);
            rndV = rndV >= 0 ? weights[~~(rndV/10)] : weights[~~(rndV/-10)] * -1;
            
            return (tier + rndV < 0 || tier + rndV >= numCanvases) ? getWeightedArr(tier, numCanvases):rndV;
        }
        const createMetaMap = (numCanvases, canvasW, canvasH) => {
            let pixelsPerTier = (canvasH * canvasW) * 4;
            let op = new Array(numCanvases).fill('');
            op.forEach((arr,i)=>op[i]=new Array(pixelsPerTier).fill(0));
            return op;
        }
        const random = () => ('.' + (window.crypto.getRandomValues(new Uint32Array(1))[0] + '').slice(-8)) / 1;
        const rndIncl = (min, max, MIN=Math.ceil(min * 1000), MAX=Math.floor(max * 1000)) => (Math.floor(random() * (MAX - MIN + 1)) + MIN) / 1000;
        const getOrigin = (val) => animationOrigins.indexOf(val.replace(/^(\d)$|\b([a-z]{1}).*?\b-?/g, '$1'));
        const jitteredRandom = (val, plusMinus) => rndIncl(val-plusMinus, val+plusMinus)

        

        const selectFX = fxName => {
            let fxParamters = fxCodex[fxName] || {};
            return Object.assign({}, codexDefaults, fxParamters);
        }

        let reset = (rev=null) => {
            activeCodex = Object.assign({}, codexDefaults);
            qsa('.particulator-canvas').forEach(cvx=>{
                // cvx.removeAttribute('style');
                if(rev==null) cvx.style.transition = 'none'; else cvx.style.transition = rev;
                Object.keys(activeCodex).forEach(key=>cvx.style.setProperty('--' + key, codexDefaults[key]))
                // Object.keys(propertyCodex.transform).forEach(key=>cvx.style.setProperty('--' + key, codexDefaults[key]))
                cvx.style.transformOrigin = '50% 50%';
            })
        }

        function decodeJitter(jitter=0, baseValue, minMax='min'){
            baseValue = ('' + baseValue).replace(/[^0-9\.-]/gim,'') * 1;
            let cleanJitter =    ('' + jitter).replace(/[^0-9\.-]/gim,'') * 1;
            console.log('baseValue :', baseValue, 'jitter :', jitter);
            if(minMax === 'min') return _R(/^\+/.test(jitter) ? baseValue : baseValue - Math.abs(cleanJitter));
            if(minMax === 'max') return _R(/^\-/.test(jitter) ? baseValue : baseValue + (1 * cleanJitter));
        }
        const prepareAnimationSequence = (fxObject=activeCodex||codexDefaults) => {
        console.log('fxObject :', fxObject);
            const toSentenceCase = (str) => str.slice(0,1).toUpperCase() + str.slice(1);
            activeCodex = Object.assign({}, codexDefaults, fxCodex[fxObject])
            console.log('activeCodex :', activeCodex);
            [...propertyCodex.transform, ...propertyCodex.filter].forEach(fx=>{
                console.log('fx :', fx, activeCodex[fx]);
                activeCodex[fx] = {
                     val : activeCodex[fx]
                    ,unt : ('' + activeCodex[fx]).replace(/[\d+-\.]/gi, '') || ''
                    ,min : decodeJitter(activeCodex['jitter' + toSentenceCase(fx)], activeCodex[fx], 'min')
                    ,max : decodeJitter(activeCodex['jitter' + toSentenceCase(fx)], activeCodex[fx], 'max')
                }
            });
            
            executeAnimationSequence(activeCodex);
            
        }
        
        const executeAnimationSequence = (fxObject=activeCodex||codexDefaults, sceneCt=0, allCanvasses=null) => {
            if(allCanvasses == null) allCanvasses = qsa('.particulator-canvas')
            allCanvasses.forEach(cvx=>{
                cvx.style.transformOrigin = (((origin%3)/2) * 100) + '% ' + ((~~(origin/3)/2) * 100) + '%';
                cvx.style.transition = activeCodex.duration + 's all ease-out';
                cvx.style.transitionDelay = jitteredRandom(activeCodex.animationStagger, activeCodex.jitterAnimationStagger) / 50 + 's';
                Object.keys(fxObject).forEach(fx=>{
                    if(/jitter/.test(fx) || !!~propertyCodex.animation.indexOf(fx) || typeof(activeCodex[fx]) === 'string') return;
                    cvx.style.setProperty('--' + fx, rndIncl(activeCodex[fx].min, activeCodex[fx].max) + activeCodex[fx].unt);
                })
        })
    }


        // const executeAnimationSequence = (fxObject=activeCodex||codexDefaults) => {
        //     let duration, stagger, staggerings = 0;
        //             duration = 0.5;
        //             stagger = 0.01;
        //             qsa('canvas').forEach((cvx,ind)=>{
        //                 staggerings += stagger
        //                 setTimeout(()=>{
        //                     cvx.style.transition = Math.random() * duration + 1+ 's all ease-out'
        //                     cvx.style.opacity    = Math.random();
        //                     cvx.style.setProperty('--scale', (0.1 * Math.random() + 1));
        //                     cvx.style.setProperty('--blur', (0.5 * Math.random()) - 0.5 + 'px');
        //                     cvx.style.setProperty('--saturate', 1);
                            
                            
        //                 }, Math.random() * staggerings * 0.6)
        //             })
        //             setTimeout(()=>executeAnimationSequence(2), (duration + staggerings) * 1000 + 550)
        //             qsa('canvas').forEach(cvx=>{
        //                     cvx.style.transition = (1+ (Math.random() - 0.5)) * duration + 's all ease-out'
        //                     cvx.style.setProperty('--opacity',      0);
        //                     cvx.style.setProperty('--blur',         (0.5 * Math.random()) + 'px');
        //                     cvx.style.setProperty('--scale',        (3   * Math.random()) + 3);
        //                     cvx.style.setProperty('--translateX',   (40  * Math.random()) + 'px');
        //                     cvx.style.setProperty('--translateY',   (160 * Math.random())- 80 + 'px'); 
        //                     cvx.style.setProperty('--saturate',     5);
        //                     cvx.style.setProperty('--brightness',   3);
        //                     cvx.style.setProperty('--contast',      3);
        //             })
        //             break;
        //     }
            
        // }
        
        
         html2canvas(contentTarget)
         .then(canvas=>scaleCanvasForRetina(canvas))
        .then(canvas => {
            canvasContext = canvas.getContext("2d");
            imageData     = canvasContext.getImageData(0, 0, canvas.width, canvas.height);
            bitmap        = imageData.data;
            canvasW       = canvas.width
            canvasH       = canvas.height
            
            pixelMaps     = createMetaMap(numCanvases, canvasW, canvasH);
            
            let targetMap;
            let activeTier, previousTier;
            for (let i = 0; i < bitmap.length; i+=4) {
                activeTier = ~~((i / bitmap.length) * numCanvases)
                let weightedResult = getWeightedArr(activeTier, numCanvases);
                targetMap  = pixelMaps[weightedResult + activeTier];
                if(previousTier !== activeTier){
                    previousTier = activeTier
                }
                targetMap[i]   = bitmap[i];
                targetMap[i+1] = bitmap[i+1];
                targetMap[i+2] = bitmap[i+2];
                targetMap[i+3] = bitmap[i+3]; 
            }

            for (let i = 0; i < numCanvases; i++) {
                let newCanvas       = d.createElement('canvas');
                newCanvas.id        = 'particulator-canvas-' + i;
                newCanvas.style     = `left:${contentPosX}; top:${contentPosY};`;
                newCanvas.className = 'particulator-canvas';
                newCanvas.width     = canvasW;
                newCanvas.height    = canvasH;
                newCanvas.getContext("2d").putImageData(new ImageData(new Uint8ClampedArray(pixelMaps[i]), canvasW, canvasH), 0, 0);
                document.body.insertAdjacentElement('afterBegin', newCanvas);
            }
            contentTarget.innerHTML = '';
            return {canvas, canvasContext, imageData, pixelMaps}
        })
        .then(constructedParameters => {
            let {canvas, canvasContext, imageData, pixelMaps} = constructedParameters
            qsa('.particulator-canvas')
            return canvas;
        });
        
        // wind, swirl, expand, contract, cloud
            /*
                disruption fx
                    none        Particles remain in place until primary elision
                    
                    expand      Particles move outwards from   center N pixels (+/- disruption jitter) over Sd seconds before elision
                    contract    Particles move inwards towards center N pixels (+/- disruption jitter) before Sd seconds elision
                      duration    The length of time in Sd seconds the disruption effect takes
                        jitter      The amount of random variability (in SdJ seconds) a particle takes to respond to the disruption effect
                      disruption fx visual modifiers                    
                        blur        The amount, if any, particles are blurred (in Bd decimal percentage of pixels) by the disruption effect. Blur duration is linear over Sd seconds
                          jitter      The amount of random variability (in BdJ seconds a particle takes to respond to the disruption effect
                        opacity     The amount, if any, particles become transparent in Od decimal of pixels by the disruption effect. Blur duration is linear over Sd seconds
                          jitter      The amount of random variability (in BdJ seconds a particle takes to respond to the disruption effect

            */