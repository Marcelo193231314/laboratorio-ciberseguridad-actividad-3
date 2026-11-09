# Práctica Integral de Ciberseguridad: Cloud, Contenedores y API Segura

Este repositorio contiene la entrega técnica estructurada en tres fases:

## Estructura del Proyecto
- `fase1-iac-localstack/`: Aprovisionamiento de AWS S3 en LocalStack con cifrado AES-256 y PublicAccessBlock vía Terraform.
- `fase2-seguridad-contenedores/`: Dockerfile mitigado actualizando la imagen base de node:14 a node:18 (reducción de 100 a 35 vulnerabilidades con Trivy).
- `fase3-api-jwt/`: API REST en Express con autenticación JWT en rutas sensibles (/api/admin) auditada mediante OWASP ZAP.
