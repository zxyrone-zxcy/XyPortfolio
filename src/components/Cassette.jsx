import "../styles/cassette.css";

// Decorative cassette tape (based on Uiverse.io by Praashoo7), shown beside the Spotify player.
export default function Cassette() {
  return (
    <div className="cassette-tilt" aria-hidden="true">
      <div className="cassette-card">
        <div className="cassette-ups">
          <div className="cassette-screw1">+</div>
          <div className="cassette-screw2">+</div>
        </div>
        <div className="cassette-card1">
          <div className="cassette-line1" />
          <div className="cassette-line2" />
          <div className="cassette-yl">
            <div className="cassette-roll">
              <div className="cassette-s_wheel" />
              <div className="cassette-tape" />
              <div className="cassette-e_wheel" />
            </div>
            <p className="cassette-num">90</p>
          </div>
          <div className="cassette-or">
            <p className="cassette-time">90 min</p>
          </div>
        </div>
        <div className="cassette-card2_main">
          <div className="cassette-card2">
            <div className="cassette-c1" />
            <div className="cassette-t1" />
            <div className="cassette-t2" />
            <div className="cassette-c2" />
            <div className="cassette-screw5">+</div>
          </div>
        </div>
        <div className="cassette-downs">
          <div className="cassette-screw3">+</div>
          <div className="cassette-screw4">+</div>
        </div>
      </div>
    </div>
  );
}
