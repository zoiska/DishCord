import { Server, ServerOff } from "lucide-react";
import { useState, useEffect } from "react";
import "./ServiceStatus.css";
import { checkServiceStatus } from "../../services/StatusService";

function ServiceStatus() {
  const [serverStatus, setServerStatus] = useState("Offline");

  useEffect(() => {
    checkServiceStatus(setServerStatus);
  }, []);

  return (
    <>
      <div className="service-status">
        <div className="server-status">
          {serverStatus === "Online" ? (
            <Server className="server-icon" />
          ) : (
            <ServerOff className="server-off-icon" />
          )}

          <p className="server-status-text">{serverStatus}</p>
        </div>
      </div>
    </>
  );
}

export default ServiceStatus;
