BEGIN
        DBMS_SCHEDULER.CREATE_JOB (
                                  job_name           =>  'FICOHSA.JOB_BLOQUEO_AUTOMATICO_PS_PA',     
                                  job_type           =>  'PLSQL_BLOCK',    
                                  job_action         =>  'BEGIN
                                                           FICOHSA.PKG_BLOQUEO_DESBLOQ_PS_PA.PR_ENVIAR_CORREO_EXCEL_PUNTO_SERVICIO_PA_MORA;
                                                           FICOHSA.PKG_BLOQUEO_DESBLOQ_PS_PA.PR_BLOQUEO_AUTO_PUNTO_SERVICIO;
                                                           FICOHSA.PKG_BLOQUEO_DESBLOQ_PS_PA.PR_DESBLOQUEO_AUTOMATICO_PUNTO_SERVICIO;
                                                           FICOHSA.PKG_BLOQUEO_DESBLOQ_PS_PA.PR_BLOQUEO_AUTO_PS_PA_ARREGLO_PAGO_VENCIDO;
                                                           FICOHSA.PKG_BLOQUEO_DESBLOQ_PS_PA.PR_SINCRONIZACION_BLOQUEOS_PS_PA_A_SQL_SERVER;
                                                          END;',  
                                  start_date         =>  TRUNC(SYSDATE) + 6/24,     
                                  repeat_interval    =>  'FREQ=HOURLY; INTERVAL=3; BYHOUR=6,9,12,15,18,21; BYDAY=MON,TUE,WED,THU,FRI,SAT',
                                  enabled            =>  TRUE,
                                  comments           =>  'Ejecuta cada 3 horas de 6 AM a 9 PM, excepto domingo'
                                  );

END;
