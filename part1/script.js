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
   return {
      data
   }
})()

const View = (() => {
   const domElement = document.getElementById('container');
   const render = (element, tmp) => {
      console.log(element)
      element.innerHTML = tmp;
   }
   const createTmp = obj => {
      const keys = Object.keys(obj);
      let tmp =
         `<div class='title-row'>
            <div class='title-box'>
               <h1>region</h1>
            </div>
            <div class='title-box'>
               <h1>model</h1>
            </div>
            <div class='title-box'>
               <h1>sales</h1>
            </div>
         </div>`;
      for (let region of keys) {
         let innerTmp = ``
         let sum = 0;
         for (let entry of obj[region]) {
            innerTmp += `
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
            sum += entry.sales;
         }
         tmp += `
         <div class='entry-row'>
            <div class='entry-box'>
               ${region}
            </div>
            <div class='entry-box'>
               sum
            </div>
            <div class='entry-box'>
               ${sum}
            </div>
         </div>
         `
         tmp += innerTmp;
      }
      render(domElement, tmp);
   }
   return {
      createTmp
   }
})()

const Controller = ((model, view) => {
   const createGroupedArr = () => {
      const groupedArr = model.data.reduce((prev, curr) => {
         prev[curr.region] = prev[curr.region] || [];
         prev[curr.region].push(curr);
         return prev;
      }, Object.create(null))
      view.createTmp(groupedArr);
   }
   return {
      createGroupedArr
   }
})(Model, View)
Controller.createGroupedArr();

