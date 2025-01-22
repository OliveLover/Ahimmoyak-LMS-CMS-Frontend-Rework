import './StorageInfo.css';


const StorageInfo = () => {
  const usedStorage = 70;
  const totalStorage = 100;
  const usagePercentage = (usedStorage / totalStorage) * 100;

  const getStorageColor = () => {
    if (usagePercentage < 70) return '#4caf50';
    if (usagePercentage < 90) return '#ff9800';
    return '#f44336';
  }

  return (
    <div className="storage-info">
      <h5>저장 용량</h5>
      <div className="storage-bar">
        <div
          className="storage-fill"
          style={{
            width: `${usagePercentage}%`,
            backgroundColor: getStorageColor(),
          }}
        ></div>
      </div>
      <p className="storage-text">
        {usedStorage}GB / {totalStorage}GB
      </p>
    </div>
  );
}

export default StorageInfo;