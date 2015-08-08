/**
 * Created by possiblelabs on 8/8/15.
 */

function convertImgToBase64URL(url, callback, outputFormat) {
    var img = new Image();
    img.crossOrigin = 'Anonymous';
    img.onload = function () {
        var canvas = document.createElement('CANVAS'),
            ctx = canvas.getContext('2d'), dataURL;
        canvas.height = this.height;
        canvas.width = this.width;
        ctx.drawImage(this, 0, 0);
        dataURL = canvas.toDataURL(outputFormat);
        callback(dataURL);
        canvas = null;
    };
    img.src = url;
}

function loadImages(callback) {
    convertImgToBase64URL('footer.jpeg', function (footer64) {
        convertImgToBase64URL('logo.jpg', function (logo64) {
            callback(footer64, logo64);
        });
    });
}

function generatePDF() {
    loadImages(function (footer64, logo64) {

        var docDefinition = {
            pageSize: 'LETTER',
            pageOrientation: 'portrait',
            pageMargins: [0, 100, 0, 250],
            header: {
                columns: [
                    {
                        image: logo64,
                        width: 150
                    },
                    {
                        text: "This is part of the header",
                        alignment: 'right',
                        margin: [0, 20, 20, 0]
                    }
                ],
                margin: [25, 25, 25, 5]
            },
            content: [

                {
                    text: "This is my Title",
                    style: 'my_title'
                },
                {
                    text: "This is a Long description\n\nTrying to write big thinks",
                    style: 'my_description'
                },

                {
                    text: "This another text over here",
                    style: 'my_plan'
                },
                {
                    table: {
                        headerRows: 1,
                        widths: ['*', 40, 80],
                        body: [
                            [
                                {
                                    text: 'Características',
                                    style: 'my_header',
                                    colSpan: 3
                                },
                                {}, {}
                            ],
                            [
                                {
                                    text: '1,1',
                                    style: 'my_cell'
                                },
                                {
                                    text: '1,2',
                                    style: 'my_cell'
                                },
                                {
                                    text: '1,3',
                                    style: 'my_cell'
                                }
                            ],
                            [
                                {
                                    text: '2,1',
                                    style: 'my_cell'
                                },
                                {
                                    text: '2,2',
                                    style: 'my_cell'
                                },
                                {
                                    text: '2,3',
                                    style: 'my_cell'
                                }
                            ]
                        ]
                    },
                    layout: 'noBorders',
                    margin: [25, 5, 25, 25]
                }
            ],
            footer: {
                image: footer64,
                width: 615,
                alignment: 'center'
            },
            styles: {
                my_title: {
                    alignment: 'center',
                    bold: true,
                    margin: [25, 5, 25, 5]
                },
                my_description: {
                    alignment: 'center',
                    bold: true,
                    margin: [25, 5, 25, 5]
                },
                my_plan: {
                    margin: [25, 10, 25, 5]
                },
                my_header: {
                    fillColor: '#F44336',
                    color: '#FFFFFF',
                    margin: [10, 5, 10, 5],
                    bold: true,
                    fontSize: 12
                },
                my_cell: {
                    fillColor: '#e8e9ea',
                    color: '#000000',
                    margin: [10, 5, 10, 5],
                    fontSize: 10
                }
            }

        };

        pdfMake.createPdf(docDefinition).download('test.pdf', function () {
            alert("The PDF document was created successfully");
        });
    });
}