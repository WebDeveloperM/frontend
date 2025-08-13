import { Compyuter } from '../types/compyuters';

export const exportToExcel = (data: Compyuter[], filename: string = 'computers') => {
  // Проверяем, что данные существуют и не пустые
  if (!data || data.length === 0) {
    throw new Error('Нет данных для экспорта');
  }

  // Создаем заголовки для Excel со всеми полями
  const headers = [
    '№',
    'Цехы',
    'Отдел', 
    'Пользователь',
    'Тип орг.техники',
    'IP адрес',
    'MAC адрес',
    'Номер пломбы',
    'Зав. склада',
    'Материнская плата',
    'Модель МП',
    'Процессор',
    'Поколение',
    'Частота',
    'HDD',
    'SSD',
    'Тип диска',
    'Тип RAM',
    'Размер RAM',
    'Видеокарта',
    'Операционная система',
    'Интернет',
    'Активен',
    'Дата добавления',
    'Дата изменения',
    'Пользователь изменения',
    'Принтеры',
    'Сканеры',
    'МФУ',
    'Веб-камеры',
    'Модели веб-камер',
    'Типы мониторов'
  ];

  // Подготавливаем данные для экспорта со всеми полями
  const excelData = data.map((item, index) => [
    index + 1,
    item.departament?.name || '',
    item.section?.name || '',
    item.user || '',
    item.type_compyuter?.name || '',
    item.ipadresss || '',
    item.mac_adress || '',
    item.seal_number || '',
    item.warehouse_manager?.name || '',
    item.motherboard?.name || '',
    item.motherboard_model?.name || '',
    item.CPU?.name || '',
    item.generation?.name || '',
    item.frequency?.name || '',
    item.HDD?.name || '',
    item.SSD?.name || '',
    item.disk_type?.name || '',
    item.RAM_type?.name || '',
    item.RAMSize?.name || '',
    item.GPU?.name || '',
    item.OS || '',
    item.internet ? 'Да' : 'Нет',
    item.isActive ? 'Да' : 'Нет',
    item.joinDate ? new Date(item.joinDate).toLocaleDateString('ru-RU') : '',
    item.history_date ? new Date(item.history_date).toLocaleString('ru-RU') : '',
    item.history_user || '',
    item.printer?.map(p => p.name).join(', ') || '',
    item.scaner?.map(s => s.name).join(', ') || '',
    item.mfo?.map(m => m.name).join(', ') || '',
    item.type_webcamera?.map(w => w.name).join(', ') || '',
    item.model_webcam?.map(m => m.name).join(', ') || '',
    item.type_monitor?.map(t => t.name).join(', ') || ''
  ]);

  // Добавляем заголовки в начало
  const allData = [headers, ...excelData];

  try {
    // Создаем CSV строку с правильным разделителем для Excel
    const csvContent = allData
      .map(row => 
        row.map(cell => {
          // Экранируем кавычки и добавляем кавычки если есть запятая, точка с запятой или перенос строки
          const cellStr = String(cell).replace(/"/g, '""');
          if (cellStr.includes(',') || cellStr.includes(';') || cellStr.includes('\n') || cellStr.includes('"')) {
            return `"${cellStr}"`;
          }
          return cellStr;
        }).join(';') // Используем точку с запятой как разделитель для лучшей совместимости с Excel
      )
      .join('\n');

    // Создаем BOM для корректного отображения кириллицы в Excel
    const BOM = '\uFEFF';
    const csvContentWithBOM = BOM + csvContent;

    // Создаем blob и скачиваем файл
    const blob = new Blob([csvContentWithBOM], { 
      type: 'text/csv;charset=utf-8;' 
    });
    
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    
    link.setAttribute('href', url);
    link.setAttribute('download', `${filename}_${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    // Очищаем URL
    URL.revokeObjectURL(url);
  } catch (error) {
    console.error('Ошибка при создании CSV файла:', error);
    throw new Error('Не удалось создать файл для экспорта');
  }
}; 