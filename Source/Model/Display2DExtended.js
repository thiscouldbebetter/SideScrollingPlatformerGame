"use strict";
class Display2DExtended extends Display2D {
    constructor(sizesAvailable, fontName, fontHeightInPixels, colorFore, colorBack, isInvisible) {
        super(sizesAvailable, fontName, fontHeightInPixels, colorFore, colorBack, isInvisible);
    }
    static fromSize(size) {
        return new Display2DExtended([size], null, null, null, null, false);
    }
    drawBox(box, cameraPos) {
        var drawPos = this._drawPos.overwriteWith(box.min()).subtract(cameraPos);
        var drawSize = this._drawSize.overwriteWith(box.max()).subtract(box.min());
        this.graphics.strokeStyle = "Gray";
        this.graphics.strokeRect(drawPos.x, drawPos.y, drawSize.x, drawSize.y);
    }
    drawFace(face, colorFill, colorBorder) {
        this.drawFace_Path(face);
        if (colorFill != null) {
            this.graphics.fillStyle = Color.systemColorGet(colorFill);
            this.graphics.fill();
        }
        if (colorBorder != null) {
            this.graphics.strokeStyle = Color.systemColorGet(colorBorder);
            this.graphics.stroke();
        }
    }
    drawFace_Path(face) {
        this.graphics.beginPath();
        var vertices = face.vertices;
        var vertex = vertices[0];
        this.graphics.moveTo(vertex.x, vertex.y);
        for (var i = 1; i < vertices.length; i++) {
            vertex = vertices[i];
            this.graphics.lineTo(vertex.x, vertex.y);
        }
        this.graphics.closePath();
    }
    draw(startPos, endPos, color) {
        if (color == null) {
            color = this.colorFore;
        }
        this.graphics.strokeStyle = Color.systemColorGet(color);
        this.graphics.beginPath();
        this.graphics.moveTo(startPos.x, startPos.y);
        this.graphics.lineTo(endPos.x, endPos.y);
        this.graphics.stroke();
    }
}
