import { ShaderPass } from "three/addons/postprocessing/ShaderPass.js";
import { GammaCorrectionShader } from "three/addons/shaders/GammaCorrectionShader.js";

export class OutputPass extends ShaderPass {
  constructor() {
    super(GammaCorrectionShader);
    this.name = "OutputPass";
  }
}
