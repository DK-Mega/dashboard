# Create a WebPack Module Federation Angular
- Crie uma aplicação angular que será o microfrontend
  
```
$ ng new mfe1
```

- Adicione o modulo federation

```
$ cd ./mfe1
$ ng add @angular-architects/module-federation
? Project name (press enter for default project) 
    mfe1
? Port to use
    3000 (Cada microfrontend precisa ter uma porta diferente de para testes locais)
```

- Criamos o módulo a ser utilizado na aplicação e depois importamos no AppModule
  
```
$ ng g m projects/main
$ ng g c projects/main
```



- Dentro do webpack.config.js devemos setar qual módulo iremos realizar o roteamento.

```
** mfe1/webpack.config.js
new ModuleFederationPlugin({
        library: { type: "module" },

        name: "mfe1",
        filename: "remoteEntry.js",
        exposes: {
            './Module': './projects/mfe1/src/app/main/main.module.ts' // Aqui trocaremos a rota do appcomponent para o módulo MainModule que usaremos no microfrontend;
            // É importante que este módulo esteja declarado no appmodule para funcionar
        },

        shared: share({
          "@angular/core": { singleton: true, strictVersion: true, requiredVersion: 'auto' }, 
          "@angular/common": { singleton: true, strictVersion: true, requiredVersion: 'auto' }, 
          "@angular/common/http": { singleton: true, strictVersion: true, requiredVersion: 'auto' }, 
          "@angular/router": { singleton: true, strictVersion: true, requiredVersion: 'auto' },

          ...sharedMappings.getDescriptors()
        })
        
    }),
```

- Para finalizar, basta criarmos as rotas
- Dentro do módulo main que criamos, importamos o RouterModule.forChild(MAIN_ROUTES)

```
** mfe1/src/app/main.module.ts
@NgModule({
  declarations: [
    MainComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(MAIN_ROUTES)
  ]
})
export class MainModule { }
```

E criamos um arquivo MAIN_ROUTES que declarará as rotas internas do microfrontend
```
import { Routes } from '@angular/router';
import { MainComponent } from './main.component';

export const MAIN_ROUTES: Routes = [
    { path: '', component: MainComponent }
];
```