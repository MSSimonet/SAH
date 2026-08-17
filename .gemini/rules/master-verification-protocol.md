---
trigger: always_on
description: Protocolo Maestro de Verificación Basada en Evidencia para erradicar falsos positivos y asegurar que toda tarea esté empíricamente comprobada antes de confirmarse.
---

# Protocolo Maestro de Verificación Basada en Evidencia (Evidence-First Protocol)

Este protocolo es de cumplimiento ESTRICTO y OBLIGATORIO en todas las tareas, órdenes y sesiones.

## 1. Prohibición Absoluta de Confirmación Prematura
- NUNCA afirmar o asumir que una tarea, corrección o cambio está "resuelto", "completado" o "impecable" basándose únicamente en haber editado un archivo o ejecutado un comando.
- Queda prohibido el uso de autoelogios o conclusiones categóricas antes de haber obtenido pruebas empíricas reales.

## 2. Verificación Cuantitativa en Tiempo Real
- **En Frontend / UI / Diseño:**
  - NUNCA confiar en que una regla CSS genérica se aplicó correctamente.
  - Ejecutar SIEMPRE una verificación programática en el navegador real (vía Playwright / consola):
    - Medir coordenadas reales con `getBoundingClientRect()` para comprobar distancias exactas (márgenes, paddings, colisiones con bordes).
    - Verificar propiedades calculadas reales con `window.getComputedStyle()`.
    - Comprobar que no existan desbordamientos horizontales (`scrollWidth <= clientWidth`) ni textos/elementos cortados.
- **En Backend / Lógica / Código:**
  - Ejecutar tests automatizados, scripts de verificación o aserciones que demuestren que la salida es idéntica a la esperada.

## 3. Inspección Focalizada en los Puntos Críticos del Usuario
- Si el usuario señaló una falla específica (con imágenes, flechas, coordenadas o descripciones puntuales de elementos cortados o pegados al borde):
  - La verificación DEBE centrarse puntualmente en ese elemento y medir el antes y el después en ese punto exacto.
  - No dar por resuelto el problema hasta comprobar numéricamente y visualmente que ese punto específico fue corregido.

## 4. Respuestas con Evidencia Técnica Verificable
- Al responder al usuario, presentar siempre la evidencia concreta de la verificación:
  - Valores numéricos exactos medidos en el DOM (ej. "Margen izquierdo medido: 24px, margen derecho: 24px").
  - Resultados de las aserciones y capturas puntuales de la zona afectada.
