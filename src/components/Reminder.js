import React, { useState, useEffect, useCallback } from 'react';
import '../styles/Reminder.scss';

function Exp() {
  const [foodItem, setFoodItem] = useState('');
  const [expirationDate, setExpirationDate] = useState('');
  const [expirationTime, setExpirationTime] = useState('');
  const [reminderDays, setReminderDays] = useState(3);
  const [reminders, setReminders] = useState([]);

  // Function to show notification
  const showNotification = useCallback((foodItem, expirationDate, expirationTime, type) => {
    if ('Notification' in window) {
      Notification.requestPermission().then(permission => {
        if (permission === 'granted') {
          const options = {
            body: `The expiration date for ${foodItem} is ${type} (${expirationDate} ${expirationTime}).`,
            icon: 'path_to_your_icon.png' // Replace with your icon path
          };
          new Notification('Food Expiration Reminder', options);
        }
      });
    }
  }, []);

  // Handle delete reminder
  const handleDeleteReminder = useCallback((id) => {
    const deletedReminder = reminders.find(reminder => reminder.id === id);
    const updatedReminders = reminders.filter(reminder => reminder.id !== id);
    setReminders(updatedReminders);

    // Show notification immediately when deleting a reminder
    if (deletedReminder) {
      showNotification(deletedReminder.foodItem, deletedReminder.expirationDate, deletedReminder.expirationTime, 'deleted');
    }
  }, [reminders, showNotification]);

  // Check expiration dates and notify
  const checkExpirationDates = useCallback(() => {
    const now = new Date();
    reminders.forEach(reminder => {
      const expiration = new Date(`${reminder.expirationDate}T${reminder.expirationTime}`);
      const diffTime = expiration.getTime() - now.getTime();
      const diffSeconds = Math.ceil(diffTime / 1000); // Calculate the difference in seconds

      // Notify when expiration date is reached
      if (diffSeconds <= 0 && !reminder.notified) {
        showNotification(reminder.foodItem, reminder.expirationDate, reminder.expirationTime, 'has reached');
        handleDeleteReminder(reminder.id); // Optionally remove the reminder after notifying
        reminder.notified = true; // Mark this reminder as notified
      }
      // Notify when approaching expiration
      else if (diffSeconds <= reminder.reminderDays * 24 * 60 * 60 && diffSeconds > 0 && !reminder.approachingNotified) {
        showNotification(reminder.foodItem, reminder.expirationDate, reminder.expirationTime, 'approaching');
        reminder.approachingNotified = true; // Mark this reminder as approaching notified
      }
    });
  }, [reminders, showNotification, handleDeleteReminder]);

  useEffect(() => {
    const interval = setInterval(checkExpirationDates, 1000); // Check every second
    return () => clearInterval(interval); // Clear interval on component unmount
  }, [checkExpirationDates]);

  const handleAddReminder = () => {
    if (foodItem && expirationDate && expirationTime) {
      const newReminder = {
        id: Math.random(), // Consider using a more stable ID generation method
        foodItem,
        expirationDate,
        expirationTime,
        reminderDays,
        notified: false, // Track if the expiration notification has been sent
        approachingNotified: false // Track if the approaching notification has been sent
      };
      setReminders(prevReminders => [...prevReminders, newReminder]);
      setFoodItem('');
      setExpirationDate('');
      setExpirationTime('');

      // Show notification immediately when adding a new reminder
      showNotification(newReminder.foodItem, newReminder.expirationDate, newReminder.expirationTime, 'added');
    } else {
      alert('Please fill in all fields.');
    }
  };

  return (
    <div className="Exp">
      <h1>Food Expiration Reminder</h1>
      <div className="add-reminder">
        <input
          type="text"
          placeholder="Food Item"
          value={foodItem}
          onChange={e => setFoodItem(e.target.value)}
        />
        <input
          type="date"
          value={expirationDate}
          onChange={e => setExpirationDate(e.target.value)}
        />
        <input
          type="time"
          value={expirationTime}
          onChange={e => setExpirationTime(e.target.value)}
        />
        <select
          value={reminderDays}
          onChange={e => setReminderDays(parseInt(e.target.value))}
        >
          <option value={1}>1 Day Before</option>
          <option value={2}>2 Days Before</option>
          <option value={3}>3 Days Before</option>
          <option value={7}>1 Week Before</option>
        </select>
        <button onClick={handleAddReminder}>Add Reminder</button>
      </div>
      <div className="reminders">
        {reminders.map(reminder => (
          <div className="reminder" key={reminder.id}>
            <span>{reminder.foodItem}</span>
            <span>Expires on: {reminder.expirationDate} {reminder.expirationTime}</span>
            <span>Reminder: {reminder.reminderDays} days before</span>
            <button className="delete-button" onClick={() => handleDeleteReminder(reminder.id)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Exp;