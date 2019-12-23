var CONSOLE_ENABLED = true
  , INFO_TRACE      = true;

(function () {
    if(!window.console || !CONSOLE_ENABLED) return;
    const oldMethods  = {assert:'A',clear:'X',count:null,debug:'D',dir:null,dirxml:null,error:'E',exception:null,group:'G',groupCollapsed:'Gc',groupEnd:'Ge',info:'I',info:'NFO',log:'',markTimeline:null,profile:null,profileEnd:null,table:'M',time:null,timeEnd:null,timeStamp:null,trace:'T',warn:'W'}
        , newVarients = {bold:'font-weight:bold',red:'color:red;',orange:'color:orange;',yellow:'color:yellow; background-color:black;',green:'color:green;',blue:'color:blue;',purple:'color:purple;',cyan:'color:cyan;',magenta: 'color:magenta;', em:'font-style:italic;',strong:'font-weight:bold;',big:'font-size:125%;',huge:'font-size:200%;',small:'font-size:75%;','styled':''}
        , noOPe    = () => {};
    Object.entries(oldMethods).forEach(kvp=>window[ '_'  + kvp[1]] = (kvp[1] != null) ? Function.prototype.bind.call(console[kvp[0]], console, '%c%s\n', kvp[1], ...arguments) : noOPe)
    Object.entries(newVarients).forEach(kvp=>window['_'  + kvp[0]] = (kvp[1] != null) ? Function.prototype.bind.call(console.log,     console, '%c%s\n', kvp[1], ...arguments) : noOPe)
    if(!INFO_TRACE) console.NFO = noOPe)
})();

const w = window                                                                                                		// Alias - window
    , d = document                                                                                              		// Alias - document
    , b = d.body                                                                                                		// Alias - document.body
    , M = Math
    , qs = (s,scope=d) => scope.querySelector(s)                                                                		// HelperFn - querySelector
    , qsa = (s,scope=d) => [...scope.querySelectorAll(s)]                                       	                	// HelperFn - querySelectorAll

    // Object Modifiers

    , unique = (arr) => [...new Set(arr.map(a=>JSON.stringify(a)))].sort().map(a=>JSON.parse(a))
    , sortObjectByKey = (arr, key, fn=(inp)=>inp) => arr.sort((a, b) => fn(a[key]).localeCompare(fn(b[key])))                                                               // Sorts an array of objects by the key specified in ASC order
    , reverseObjectByKey = (arr, key) => arr.sort((a, b) => b[key].localeCompare(a[key]))                                                                                   // Sorts an array of objects by the key specified in DESC order
    , alphabetizeAZ = (o, rev=false) => Object.keys(o).sort().reduce((r, k) => (r[k] = o[k], r), {})
    , alphabetizeZA = (o, rev=false) => Object.keys(o).sort().reverse().reduce((r, k) => (r[k] = o[k], r), {})
    , absSort = (arr, dir='+', d=((dir+1)/1)) => arr.sort((A,B,a=A.toUpperCase(),b=B.toUpperCase())=>((a!==b) * ((a<b) ? -d : d)))

    // Rote memory's storage                                                                                    		                                                    // Really these are all just helper functions that amuse me.
    , rote          = window.localStorage                                                                                                                                   // Alias to the window's localStorage. 
    , memories      = () => rote.length || 0                                                 			                                                                    // Returns the count of how many memories are being held in rote storage
    , memorization  = (t) => rote = /s/gi.test(t) ? window.sessionStorage : window.localStorage                                                                             // Switch between (S)hort-term (session) and (L)ong-term (local) storage
    
    , verity        = Date.now()                                                                                     	                                                    // Timestamp of this most current page load
    , senescence    = verity - 2592000000                                                                                                                                   // Timestamp of verity, aged 30 days. Used to periodically flush long-term memories
    , flashback     = () => {let yore = recall('exp'); return yore ? yore : retain('exp',verity) }                                                                          // Recalls a time precisely... or not at all. 
    , dismiss       = (()=>{if(memories() && flashback() < senescence()){fugue(); flashback();}})()                                                                         // Wipes clean memories older than senescence permits
    
    , retain        = (k, v) => rote.setItem(k, v) || v                                        		                	                                                    // Creates/Updates a memory for key k with value v, then returns v (opposes: RECALL)
    , preserve      = (k, o, v=JSON.stringify(o)) => retain(k, v) ? o : o                                              	                                                    // Converts an object o to string v, retains it, then returns the original object o (opposes: REGRESS)
        
    , reflect       = (k, v=null) => retain(k, recall(k, v))                                                    	                                                        // Creates a new memory k with value v, only if key k doesn't already exists

    , recall        = (k, def=null) => { k = rote.getItem(k); return k ? k : (def ? def : null); }                                                                          // Returns a memory value if present. If not, returns def if provided, null if not (opposes: RETAIN)
    , recollect     = (k, def=null) => JSON.parse(recall(k, def))                                                                                                           // Recalls a memory, then parses it back into an object (opposes: PONDER)
    
    , forget        = (k) => rote.removeItem(k) || !memories()                                                   		                                                    // Discards any memories at key k and returns the new length of the collection
    , fugue         = () => rote.clear() || !memories()                                                                                                                     // Purges all memories in Rote storage and returns the new length of the collection
    
    , guido = (l=8) =>new Array(l).fill(0).map(()=>M.floor(M.random()*15).toString(0xF)).join('')
