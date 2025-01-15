function changeImage()
{
    var alttag = " -labeled";                        //Change this depending on how you're naming the images.
    var img = document.getElementById("image");                //Just grabs the element you care about, change the ID as needed.
    var url = img.src;                            //Just grabs the URL from the image.
    var urlparts = url.split(".");                        //Split the URL wherever there's a period, in order to handle file extensions.
    if (urlparts[0].endsWith(alttag)) {                    //If the first part of the URL already has the alt tag:
        var relevantlength = urlparts[0].length - alttag.length;    //Figure out how long it'd be without the tag.
        urlparts[0] = urlparts[0].slice(0,relevantlength);        //Slice it to that length.
    }
    else {                                    //Or, if there's no alt tag already:
        urlparts[0] = urlparts[0].concat(alttag);            //Add the alt tag.
    }
    img.src = urlparts.join(".");                        //Rejoin the parts with periods, to reattach file extensions.
}