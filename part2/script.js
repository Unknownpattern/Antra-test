
const Model = (() => {
   const data = [
      { region: 'US', model: 'A', sales: 150 },
      { region: 'US', model: 'B', sales: 120 },
      { region: 'US', model: 'C', sales: 350 },
      { region: 'EU', model: 'A', sales: 200 },
      { region: 'EU', model: 'B', sales: 100 },
      { region: 'EU', model: 'C', sales: 250 },
      { region: 'CA', model: 'A', sales: 200 },
      { region: 'CA', model: 'B', sales: 100 },
      { region: 'CA', model: 'C', sales: 230 },
      { region: 'CA', model: 'D', sales: 400 },
   ];
   class State {
      #currentRegion = 'all';
      #currentModel = 'all';
      regionList = ['all'];
      modelList = ['all'];
      get currentRegion() {
         return this.#currentRegion;
      }
      get currentModel() {
         return this.#currentModel;
      }
      set currentRegion(val) {
         this.#currentRegion = val;
      }
      set currentModel(val) {
         this.#currentModel = val;
      }
   }
   return {
      data,
      State
   }
})();
const View = (() => {
   const domElement = {
      container: document.getElementById('container'),
      regionFilter: document.getElementById('region'),
      modelFilter: document.getElementById('model')
   };
   const render = (element, tmp) => {
      element.innerHTML = tmp;
   }
   const createTmp = obj => {
      const keys = Object.keys(obj);
      let tmp =
         `<div class='title-row'>
            <div class='title-box'>
               <h3>region</h3>
            </div>
            <div class='title-box'>
               <h3>model</h3>
            </div>
            <div class='title-box'>
               <h3>sales</h3>
            </div>
         </div>`;
      for (let region of keys) {
         for (let entry of obj[region]) {
            tmp += `
            <div class='entry-row'>
               <div class='entry-box'>
                  ${entry.region}
               </div>
               <div class='entry-box'>
                  ${entry.model}
               </div>
               <div class='entry-box'>
                  ${entry.sales}
               </div>
            </div>
            `
         }
      }
      console.log(tmp);
      render(domElement.container, tmp);
   }
   return {
      domElement,
      createTmp,
      render
   }
})();
const Controller = ((model, view) => {
   const state = new model.State();
   const createFilteredObj = () => {
      //filter 
      const groupedObj = model.data.reduce((prev, curr) => {
         if ((state.currentRegion === 'all' || state.currentRegion === curr.region) && (state.currentModel === 'all' || state.currentModel === curr.model)) {
            prev[curr.region] = prev[curr.region] || [];
            prev[curr.region].push(curr);
         }
         return prev;
      }, Object.create(null));
      view.createTmp(groupedObj);

   }
   const initData = () => {
      let groupByRegion = model.data.reduce((prev, curr) => {
         prev[curr.region] = prev[curr.region] || [];
         prev[curr.region].push(curr);
         return prev;
      }, Object.create(null));
      let groupByModel = model.data.reduce((prev, curr) => {
         prev[curr.model] = prev[curr.model] || [];
         prev[curr.model].push(curr);
         return prev;
      }, Object.create(null));
      state.regionList = state.regionList.concat(Object.keys(groupByRegion));
      state.modelList = state.modelList.concat(Object.keys(groupByModel));
   }
   const createDropDown = () => {
      let tmpRegion = ``;
      let tmpModel = ``;
      for (let option of state.regionList) {
         tmpRegion += `
         <option value='${option}'>${option}</option>
         `
      }
      for (let option of state.modelList) {
         tmpModel += `
         <option value='${option}'>${option}</option>
         `
      }
      view.render(view.domElement.modelFilter, tmpModel);
      view.render(view.domElement.regionFilter, tmpRegion);

      view.domElement.modelFilter.addEventListener('change', (event) => {
         state.currentModel = event.target.value;
         createFilteredObj()
      })
      view.domElement.regionFilter.addEventListener('change', (event) => {
         state.currentRegion = event.target.value;
         createFilteredObj()
      })
   }
   const init = () => {
      initData();
      createDropDown();
      createFilteredObj();
   }
   return {
      init,
      createFilteredObj
   }
})(Model, View)


Controller.init();