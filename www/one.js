        window.timeline = [];
        const codexDefaults = {
            // Animation Control Attributes
            animationSceneOffset : '0s',           canvasCount            : 24,
            animationOrigin      : 'middle',       direction              : 'forwards',
            duration             : '1s',           jitterDuration         : '0s',
            successor            : '',             successorDelay         : '1s',
            predecessor          : '',             predecessorDelay       : '0s',
            animationStagger     : '0.1s',         jitterAnimationStagger : '0s',

            // Transformative Attributes
            translateX           : '0px',          jitterTranslateX       : '0px',
            translateY           : '0px',          jitterTranslateY       : '0px',
            rotate               : '0deg',         jitterRotate           : '0deg',
            scale                : 1,              jitterScale            : 0,

            // Visual Filter Attributes
            blur                 : 0,              jitterBlur             : 0,
            brightness           : 1,              jitterBrightness       : 0,
            saturate             : 1,              jitterSaturate         : 0,
            contrast             : 1,              jitterContrast         : 0,
            opacity              : 1,              jitterOpacity          : 0
        }
        let fxCodex = { // Legacy
             smokeO : {canvasCount : 24, duration : 2.00, jitterDuration : 0.125, animationStagger : 200, jitterAnimationStagger : 100, blur : '2.8px', translateX : 500, translateY : 0, rotation: 0, jitterBlur : 0, jitterTranslateX : 15, jitterTranslateY : 15, jitterRotation : 300}
            ,flushO    : {canvasCount : 30, duration : 6.00, animationStagger :   10,      blur             :    0.0, translateX             :    0,    translateY :     0,             rotation:    '1540deg', jitterBlur  :           0,          jitterTranslateX :            0,           jitterTranslateY :         0,      jitterRotation   :  '180deg'}
            ,dust            : {canvasCount : 24, duration : 2.00, animationStagger : 200,      blur           : 0.8, translateX             : 200,  translateY : -100,          rotation : 0,         jitterBlur : 0,          jitterTranslateX : 35,          jitterTranslateY          : 35,     jitterRotation    : 10}
            ,dissolve        : {canvasCount : 24, duration : 0.50, animationStagger : 100,      blur           : 2.0, translateX             : 0,    translateY : 0,             rotation : 0,         jitterBlur : 0,          jitterTranslateX : 15,          jitterTranslateY          : 15,     jitterRotation    : 10}
            ,dissapate       : {canvasCount : 10, duration : 3.00, animationStagger : 100,      blur           : 5.0, translateX             : -300, translateY : -100,          rotation : 0,         jitterBlur : 0,          jitterTranslateX : 80,          jitterTranslateY          : 25,     jitterRotation    : 360}
        }

        fxCodex = { // New
             Smoke       : {
                animationSceneOffset : '0s',         canvasCount            : 24,
                animationOrigin      : 'middle',     direction              : 'forwards',
                duration             : 3.00,         jitterDuration         : 1.50,
                successor            : '',           successorDelay         : '0s',
                predecessor          : '',           predecessorDelay       : '0s',
                animationStagger     : 5,            jitterAnimationStagger : 1,

                translateX           : '500px',      jitterTranslateX       : '0px',
                translateY           : '-30px',      jitterTranslateY       : '-25px',
                rotate               : '0deg',       jitterRotate           : '1deg',
                scale                : 1,            jitterScale            : 0,
                
                blur                 : '2.8px',      jitterBlur             : '0.5px',
                brightness           : 1,            jitterBrightness       : 0,
                saturate             : 1,            jitterSaturate         : 0,
                contrast             : 1,            jitterContrast         : 0,
                opacity              : 0,            jitterOpacity          : 0
            }
            ,Flush      : {canvasCount : 8,    duration : 0.75,    jitterDuration : 0.125,    animationStagger : 10,   jitterAnimationStagger : 5,     scale : 0.95,    jitterScale : '+0.5',    blur : '0.25px',    jitterBlur : '0.25px',    successor   : 'flushSeq'}
            ,flushSeq   : {canvasCount : 8,    duration : 2.55,    jitterDuration : 0.125,    animationStagger : 10,   jitterAnimationStagger : 5,     scale : 0.00,    jitterScale : '+0.5',    blur : '2.25px',    jitterBlur : '2.25px',    predecessor : 'Flush', rotate     : '1540deg',    jitterRotate : '540deg',    opacity : 0}
            ,Implode    : {canvasCount : 8,    duration : 0.75,    jitterDuration : 0.125,    animationStagger : 10,   jitterAnimationStagger : 5,     scale : 0.95,    jitterScale : '+0.5',    blur : '0.25px',    jitterBlur : '0.25px',    successor   : 'implodeSeq'}
            ,implodeSeq : {canvasCount : 8,    duration : 0.75,    jitterDuration : 0.125,    animationStagger :  0,   jitterAnimationStagger : 0,     scale : 0.00,    jitterScale : 0,         blur : '0.5px',     jitterBlur : '0.5px',     predecessor : 'Implode', saturate : 5, brightness              : 3, contrast          : 3, opacity : 0, translateX : '40px', jitterTranslateX : '40px', translateY : '0px', jitterTranslateY : '60px'}
            ,Burst      : {canvasCount : 8,    duration : 0.75,    jitterDuration : 0.125,    animationStagger : 10,   jitterAnimationStagger : 5,     scale : 0.95,    jitterScale : '+0.5',    blur : '0.25px',    jitterBlur : '0.25px',    successor   : 'burstSeq'}
            ,burstSeq   : {canvasCount : 4,    duration : 0.25,    jitterDuration : 0.125,    animationStagger :  0,   jitterAnimationStagger : 0,     scale : 4.50,    jitterScale : 3,         blur : '0.5px',     jitterBlur : '0.5px',     predecessor : 'Burst', saturate   : 5, brightness              : 3, contrast          : 3, opacity : 0, translateX : '40px', jitterTranslateX : '40px', translateY : '0px', jitterTranslateY : '60px'}
        }

        
        let animationOrigins              = ['tl','t','tr','l','m','r','bl','b','br'],
            scaleFactor                   = 1,
            propertyCodex                 = [];
            propertyCodex['animation']    = ['canvasCount', 'duration', 'jitterDuration', 'animationOrigin', 'animationStagger', 'jitterAnimationStagger'];
            propertyCodex['transform']    = ['translateX', 'translateY', 'rotate', 'scale'];
            propertyCodex['filter']       = ['blur', 'brightness', 'saturate', 'contrast', 'opacity'];
            propertyCodex['webkitFilter'] = propertyCodex['filter'];
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
            resolve(canvas);
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
        const random         = ()               => ('.' + (window.crypto.getRandomValues(new Uint32Array(1))[0] + '').slice(-8)) / 1;
        const rndIncl        = (min, max, MIN=Math.ceil(min * 1000), MAX = Math.floor(max * 1000)) => (Math.floor(random() * (MAX - MIN + 1)) + MIN) / 1000;
        const getOrigin      = (val)            => animationOrigins.indexOf(val.replace(/^(\d)$|\b([a-z]{1}).*?\b-?/g, '$1'));
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

        function annihilate() {
            contentTarget.style.opacity=1;
            reset();
            contentTarget.innerHTML = contentMarkup;
            qsa('.particulator-canvas').forEach(c=>c.remove());
            init();
        }

        function decodeJitter(jitter=0, baseValue, minMax='min'){
            baseValue = ('' + baseValue).replace(/[^0-9\.-]/gim,'') * 1;
            let cleanJitter =    ('' + jitter).replace(/[^0-9\.-]/gim,'') * 1;
            // console.log('baseValue :', baseValue, 'jitter :', jitter);
            if(minMax === 'min') return _R(/^\+/.test(jitter) ? baseValue : baseValue - Math.abs(cleanJitter));
            if(minMax === 'max') return _R(/^\-/.test(jitter) ? baseValue : baseValue + (1 * cleanJitter));
        }

        const prepareAnimationSequence = (fxObject='', formed=false) => {
            const toSentenceCase = (str) => str.slice(0,1).toUpperCase() + str.slice(1);
            let formControls = qs('nav');
            let fields = qsa('input[type="text"]', formControls);
            if(formed) {
                activeCodex = Object.assign({}, codexDefaults);
                fields.forEach(field=>activeCodex[field.id] = field.value);
            }else{
                activeCodex = Object.assign({}, codexDefaults, fxCodex[fxObject]);
                // console.log('activeCodex :', activeCodex);

                fields.forEach(field=>field.value = activeCodex[field.id] )
            }
            if(activeCodex.successor){
                let succ = activeCodex.successor;
                activeCodex.successor = null;
                window.timeline = setTimeout(()=>prepareAnimationSequence(succ), (1000 * activeCodex.duration));
            }
            //else window.setTimeout(annihilate, 1000*activeCodex.duration);

            [...propertyCodex.transform, ...propertyCodex.filter].forEach(fx=>{
                activeCodex[fx] = {
                     val : activeCodex[fx]
                    ,unt : ('' + activeCodex[fx]).replace(/[\d+-\.]/gi, '') || ''
                    ,min : decodeJitter(activeCodex['jitter' + toSentenceCase(fx)], activeCodex[fx], 'min')
                    ,max : decodeJitter(activeCodex['jitter' + toSentenceCase(fx)], activeCodex[fx], 'max')
                }
            });

            executeAnimationSequence(activeCodex);

        }

        const executeAnimationSequence = (applicableCodex=activeCodex||codexDefaults, sceneCt=0, allCanvasses=null) => {
            function updateAllKeys(keychain, codex, cvx){
                keychain.forEach(fx=>{
                    if(/jitter/.test(fx) || !!~propertyCodex.animation.indexOf(fx) || typeof(codex[fx]) === 'string') return;
                    if(codex[fx] && cvx && cvx.style && codex[fx] != codexDefaults[fx] && codex[fx].val != codexDefaults[fx]){
                        if(codex[fx].min) cvx.style.setProperty('--' + fx, rndIncl(codex[fx].min, codex[fx].max) + codex[fx].unt);
                        else                    cvx.style.setProperty('--' + fx, codex[fx].val) || codex[fx];

                    }
                })
            }
            if(allCanvasses == null) allCanvasses = qsa('.particulator-canvas')
            allCanvasses.forEach(cvx=>{
                cvx.style.transformOrigin = (((origin%3)/2) * 100) + '% ' + ((~~(origin/3)/2) * 100) + '%';
                cvx.style.transition = jitteredRandom(applicableCodex.duration, applicableCodex.jitterDuration) + 's transform, filter ' + jitteredRandom(applicableCodex.duration, applicableCodex.jitterDuration) + 's';
                cvx.style.transitionDelay = jitteredRandom(applicableCodex.animationStagger, applicableCodex.jitterAnimationStagger) / 50 + 's';
                updateAllKeys(Object.keys(applicableCodex), applicableCodex, cvx)

            })
        }

        const genForm = () => {
        // console.log('genForm :', genForm);
            let navPanel = qs('#controls'),
                opHTML=[],
                jitterMod = '';
            navPanel.innerHTML = '';
            Object.keys(codexDefaults).forEach(key=>{
                jitterMod = 'control'
                // console.log('/jitter|delay/i.test(key) :', /jitter|delay/i.test(key));
                if(/jitter|delay/i.test(key)){
                    jitterMod = 'jitterdE';
                    opHTML[opHTML.length-1] = opHTML[opHTML.length-1].replace(/control/i, 'jitterdB');
                }
                if(/^-?\d+?\D/i.test(codexDefaults[key])){
                    opHTML.push(`<div class="${jitterMod}"><label>${key}:</label><input type="text" id="${key}" class="val-field-s" data-unit="${codexDefaults[key].replace(/[0-9\-\.]/g, '')}" value="${codexDefaults[key].replace(/\D/g, '')}" />${codexDefaults[key].replace(/[0-9\-\.]/g, '')}</div>`);
                }else{
                    opHTML.push(`<div class="${jitterMod}" ${jitterMod}><label>${key}:</label><input type="text" id="${key}" class="val-field" value="${codexDefaults[key]}" /></div>`);
                }
            })
            opHTML.push(`<button onclick="annihilate()">Reset</button><button onclick="prepareAnimationSequence('',true)">Execute</button>`);
            navPanel.insertAdjacentHTML('beforeEnd', opHTML.join(''));
            return codexDefaults;
        }

        var init = function () {
            console.log(performance, performance.now())
            html2canvas(contentTarget)
            //  .then(canvas=>scaleCanvasForRetina(canvas))
            .then(canvas => {
            // console.log('.then(canvas => { :');
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

                    newCanvas.width     = canvasW / 0.9;
                    newCanvas.height    = canvasH / 0.9;
                    newCanvas.getContext("2d").putImageData(new ImageData(new Uint8ClampedArray(pixelMaps[i]), canvasW, canvasH), 0, 0);
                    contentTarget.style.opacity=0;
                    document.body.insertAdjacentElement('afterBegin', newCanvas);
                }
                contentTarget.innerHTML = '';
                return {canvas, canvasContext, imageData, pixelMaps}
            })
            .then(()=>{
                let shortcutsPanel = qs('#shortcuts'),
                    shortcutButtons = [];
                shortcutsPanel.innerHTML = '';
                let reducedCodex = {};
                Object.entries(fxCodex).forEach(codices => { if(!codices[1].predecessor || codices[1].predecessor == ''){ reducedCodex[codices[0]] = reducedCodex[codices[1]]; } });
                Object.keys(reducedCodex).forEach(key=>{
                    shortcutButtons.push(`<button onClick='prepareAnimationSequence("${key}")'>${key} It!</button>`);
                });
                shortcutButtons.push(`<button onClick='reset()'>Reset It!</button>`);
                shortcutsPanel.insertAdjacentHTML('beforeEnd', shortcutButtons.join(''));
            })
            .then(()=>genForm());
        }
        init();


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