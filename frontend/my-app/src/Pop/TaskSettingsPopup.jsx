import React, { useState, useEffect } from 'react';
import styles from './TaskSettingsPopup.module.css';

const TaskSettingsPopup = ({ task, onClose, onSave }) => {
  const [description, setDescription] = useState(task.description || '');
  const [startTime, setStartTime] = useState(task.startTime || '');
  const [endTime, setEndTime] = useState(task.endTime || '');
  const [repeatOption, setRepeatOption] = useState(task.repeatOption || '');

  useEffect(() => {
    if (startTime) {
      const reminderTime = new Date(new Date(startTime).getTime() - 10 * 60000);
      console.log('Reminder set for:', reminderTime);
    }
  }, [startTime]);

  const handleSave = () => {
    onSave({
      ...task,
      description,
      startTime,
      endTime,
      repeatOption,
    });
    onClose();
  };

  return (
    <div className={styles.popupOverlay}>
      <div className={styles.popupContent}>
        <h3>Task Settings</h3>
        <label>
          Description:
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </label>
        <label>
          Start Time:
          <input
            type="datetime-local"
            value={startTime}
            onChange={(e) => setStartTime(e.target.value)}
          />
        </label>
        <label>
          End Time:
          <input
            type="datetime-local"
            value={endTime}
            onChange={(e) => setEndTime(e.target.value)}
          />
        </label>
        <label>
          Repeat:
          <select
            value={repeatOption}
            onChange={(e) => setRepeatOption(e.target.value)}
          >
            <option value="">None</option>
            <option value="daily">Daily</option>
            <option value="weekly">Weekly</option>
            <option value="monthly">Monthly</option>
          </select>
        </label>
        <div className={styles.popupButtons}>
          <button onClick={handleSave}>Save</button>
          <button onClick={onClose}>Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default TaskSettingsPopup;
