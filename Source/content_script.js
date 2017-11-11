walk(document.body);

function walk(node) 
{
	// I stole this function from here:
	// http://is.gd/mwZp7E
	
	var child, next;

	switch ( node.nodeType )  
	{
		case 1:  // Element
		case 9:  // Document
		case 11: // Document fragment
			child = node.firstChild;
			while ( child ) 
			{
				next = child.nextSibling;
				walk(child);
				child = next;
			}
			break;

		case 3: // Text node
            if(node.parentElement.tagName.toLowerCase() != "script") {
                handleText(node);
            }
			break;
	}
}

function handleText(textNode) {
	var v = textNode.nodeValue;
    var p = textNode.parentNode.innerHTML;


    let exp = /[0-9]{2}[A-Z]{1}\s?[A-Z]{2}\s?[0-9]{1,5}\s?[0-9]{1,5}/g

    if (v.match(exp) != null) {
        console.debug('Replacing: ', textNode)
        let grids = v.match(exp);
        for (let i = 0; i < grids.length; i++ ) {
            p = p.replace(grids[i], 
                function() {
                    var newSpan = document.createElement('span');
                    newSpan.innerHTML = grids[i];
                    newSpan.style.backgroundColor = 'yellow';
                    return newSpan.outerHTML;
                    //return "<b>TEST</b>";
                }
            );
        }
        textNode.parentNode.innerHTML = p;
    }


  // Deal with the easy case
  /*v = v.replace(/\b(T|t)he (C|c)loud/g, function(match, p1, p2, offset, string) {
    // t - 7 = m
    // c - 1 = b
    m = String.fromCharCode(p1.charCodeAt(0) - 7);
    b = String.fromCharCode(p2.charCodeAt(0) - 1);
    return m + "y " + b + "utt";
  });*/

  // Deal with private clouds
  /*v = v.replace(/\b(P|p)rivate (C|c)loud/g, function(match, p1, p2, offset, string) {
    // c - 1 = b
    b = String.fromCharCode(p2.charCodeAt(0) - 1);
    return b + "utt";
  });*/

    // Last Step
	//textNode.nodeValue = v;
    //textNode.innerHTML = v;
    //textNode.parentElement.innerHTML = v;
    //textNode.parentNode.innerHTML = p;
}


