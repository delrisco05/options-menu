## Primeros pasos

1. Clone el repositorio con el comando `git clone <url>`.
2. Configure dentro de la rama `main` los siguientes aspectos:
    - Configure los **todos** workflows modificando las variables `env` dentro de los archivos .yml de la carpeta `.github/workflows`, excepto el workflow `sonar_scan.yml`.
    - Configure el archivo `sonar-project.properties` configurando los valores `sonar.projectKey` y `sonar.organization` de acuerdo a los valores proporcionados por gestión de la configuración.
4. Inicialice el proyecto.
5. Agregue los cambios y nuevos archivos al repositorio local con `git add .` (Asegurese de tener configurado git).
6. Realice un commit en la rama `main` con el comando `git commit -m "<conventional commit>"` un ejemplo de conventional commit puede ser `ci: commit de inicialización`.
7. Cargue los cambios de la rama main en el repositorio remoto (GitHub) con el comando `git push origin main`
8. **EN GITHUB**: Una vez con cambios hayan sido agregados al repositorio en github, cree la rama `development` a partir de la rama main.
9. En su repositorio local ejecute el comando `git checkout -b development` para crear la rama de development y acceder a ella.
10. Con el fin de evitar conflictos y para asegurar la integridad de las ramas escriba el comando `git pull origin development` lo cual evaluará la rama development del repositorio local con la rama development en el repositorio remoto.

¡Listo! El repositorio ya se encuentra configurado de forma satisfactoria para empezar con los desarrollos.
