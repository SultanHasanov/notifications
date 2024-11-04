import React, { useEffect } from 'react';


function App() {
  useEffect(() => {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/service-worker.js')
        .then((registration) => {
          console.log('Service Worker registered with scope:', registration.scope);
        });
    }
    
    // Запросить разрешение на отправку уведомлений
    Notification.requestPermission().then(permission => {
      if (permission === 'granted') {
        new Notification('Уведомление', {
          body: 'Это пример уведомления!',
        });
      }
    });
  }, []);


  const requestNotificationPermission = async () => {
    const permission = await Notification.requestPermission();
    if (permission === 'granted') {
      console.log('Разрешение на уведомления предоставлено');
    } else {
      console.log('Разрешение на уведомления отклонено');
    }
  };
  
  // Вызовите эту функцию, когда вы хотите запросить разрешение
  requestNotificationPermission();
  

  const sendNotification = () => {
    if (Notification.permission === 'granted') {
      new Notification('Уведомление', {
        body: 'Это пример уведомления при нажатии кнопки!',
      });
    } else {
      console.log('Нет разрешения на отправку уведомлений');
    }
  };

  return (
    <div className="App">
      <h1>Добро пожаловать в PWA React!</h1>
      <button onClick={sendNotification}>Отправить уведомление</button>
    </div>
  );
}

export default App;
