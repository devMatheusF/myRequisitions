Este projeto contempla a ideia de estrutura e compartilhamento de dados entre as stores do projeto. 
O exemplo usado foi a seleção de uma região, planta e a atribuição de um usuário ao acessar a página.
Esses dados foram compartilhados via hook e salvos em ambos os contextos de domínio, tanto no set do domínio de region, quanto no purchase requisition.

Os próximos passos desta estrutura é lidar com os subdominions com seus próprios subdominios por processo e tipos de item.

Basicamente seguimos toda recomendação da documentação do redux para seguir com este processo, abortando a ideia dada anteriormente de multiplas stores com a premissa de dificultar e muito ter uma única fonte da verdade e tornar a lógica de controle de estado exponencialmente mais complexa a cada nova iteração.

Este repositório contém:

```
MyRequisitions/
├── src/
  ├── MyRequisitions/
  ├──── domains/
  │   └── PurchaseRequisition/              # CORE DOMAIN
  │       ├── components/
  │       ├── store/
  │           │── store.ts  #Arquivo que contém o slice de PurchaseRequisition
  │           │── purchaseRequisitionSelectors.ts  #Arquivo que contém exemplo dos seletores centralizados
  │           │── selectors/  #Diretório que contém os selectors de PurchaseRequisition separados
  │               │── regionSelector.ts  
  │               │── prStatsSelector.ts  
  ├──── subdomains/
  │   └── leasing/
  │   └── spotbuy
  ├── Region/
  ├──── domains/
  │   └── SelectedPlant/              # CORE DOMAIN
  │       ├── components/
  │       ├── store/
  │           │── store.ts  #Arquivo que contém o slice de SelectedPlant
  │           #A estrutura de PR poderá se repetir aqui com relação a separação de selectors
  ├──── subdomains/
  │   └── leasing/
  │   └── spotbuy

  ├── app/
    ├── components/ #contém os componentes que serao implementados por todos os domínios
    ├── layout/ 
    ├── pages/ #contém as rotas que implementam os domínios
    ├── lib/ #contém as funcionalidades reutilizáveis em toda aplicação
    ├── store/ #contém a store global + os slices globais que não são domínios, como usuário
    
```

Fluxograma de toda aplicação:
https://excalidraw.com/#json=avo7Vcner5FzHoBeT9qpp,2C12dWp7TOEG0HtwOiHTCg

Para rodar localmente:
`npm install + npm run dev`


Exemplo visual no projeto:

![image](https://github.com/user-attachments/assets/661b4aa6-8832-4abf-8be4-f8803e835f9c)


Comparação sobre as duas soluçōes de estado e organização das stores e reducers implementadas:
![image](https://github.com/user-attachments/assets/8cc7bce4-8738-4c28-8fe2-99c5b62d1128)


Documentação oficial da POC:
https://www.notion.so/Documenta-o-oficial-prova-de-conceito-IProcure-20c648bb9a268090bc96c506427403b5?showMoveTo=true

Implementação de ambos os formulários funcionais:
<img width="1360" alt="image" src="https://github.com/user-attachments/assets/cde16077-e524-4890-9427-74446999df66" />

