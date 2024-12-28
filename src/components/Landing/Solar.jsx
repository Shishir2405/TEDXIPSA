import React from "react";
import "./solar-system.css"

const Solar = () => {
  return (
    <div>
      
      <div id="universe" className="scale-stretched">
        <div id="galaxy">
          <div id="solar-system" className="earth">
            <div id="mercury" className="orbit">
              <div className="pos">
                <div className="planet">

                </div>
              </div>
            </div>
            <div id="venus" className="orbit">
              <div className="pos">
                <div className="planet">

                </div>
              </div>
            </div>
            <div id="earth" className="orbit">
              <div className="pos">
                <div className="orbit">
                  <div className="pos">
                    <div className="moon"></div>
                  </div>
                </div>
                <div className="planet">

                </div>
              </div>
            </div>
            <div id="mars" className="orbit">
              <div className="pos">
                <div className="planet">
                  <dl className="infos">
                    <dt>Mars</dt>
                    
                  </dl>
                </div>
              </div>
            </div>
            <div id="jupiter" className="orbit">
              <div className="pos">
                <div className="planet">
                  <dl className="infos">
                    <dt>Jupiter</dt>
                    
                  </dl>
                </div>
              </div>
            </div>
            <div id="saturn" className="orbit">
              <div className="pos">
                <div className="planet">
                  <div className="ring"></div>
                  <dl className="infos">
                    <dt>Saturn</dt>
                    
                  </dl>
                </div>
              </div>
            </div>
            <div id="uranus" className="orbit">
              <div className="pos">
                <div className="planet">
                  <dl className="infos">
                    <dt>Uranus</dt>
                    
                  </dl>
                </div>
              </div>
            </div>
            <div id="neptune" className="orbit">
              <div className="pos">
                <div className="planet">
                  <dl className="infos">
                    <dt>Neptune</dt>
                    
                  </dl>
                </div>
              </div>
            </div>
            <div id="sun">
              <dl className="infos">
                <dt>Sun</dt>
                <dd>
                  <span></span>
                </dd>
              </dl>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Solar;
