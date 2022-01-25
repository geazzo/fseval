"use strict";(self.webpackChunkwebsite=self.webpackChunkwebsite||[]).push([[699],{5096:function(e,t,n){n.r(t),n.d(t,{contentTitle:function(){return C},default:function(){return x},frontMatter:function(){return N},metadata:function(){return I},toc:function(){return S}});var a=n(7462),r=n(3366),i=n(7294),s=n(3905),o=n(6396),l=n(8215),m=n(7855),c=n(1832),f=n(6934),u=n(102),p=(n(4251),function e(t,n,a){void 0===n&&(n={items:{}}),void 0===a&&(a="");for(var r=0,i=Object.entries(t);r<i.length;r++){var s=i[r],o=s[0],l=s[1],m="string"!=typeof l,c=(a+"/"+o).replace("/root",""),f=c.split(".").pop();n.items[o]={index:o,hasChildren:m,children:m?Object.keys(l):void 0,canMove:!1,canRename:!1,data:{filePath:c,fileExtension:f,key:o,content:m?null:l}},m&&e(l,n,a+"/"+o)}return n});function d(e){var t=e.template,n=e.treeId,a=e.viewState,r=e.onPrimaryAction,s=e.environment,o=p(t);return i.createElement(c.q,{dataProvider:new f.j(o.items,(function(e,t){return Object.assign({},e,{data:t})})),getItemTitle:function(e){return e.data.key},viewState:a,onPrimaryAction:r},i.createElement(u.m,{treeId:n,rootItem:"root",treeLabel:"Tree Example",ref:s}))}var h=n(9055),_={data:{filePath:"loading...",fileExtension:"",content:""}};function g(e){var t=e.template,n=e.treeId,a=e.viewState,r=e.defaultItem,s=void 0===r?_:r,o=(0,i.useRef)(),l=(0,i.useState)(s),c=l[0],f=l[1],u=(c||_).data;return(0,i.useEffect)((function(){try{for(var e,t=o.current,a=t.treeEnvironmentContext.viewState[n].selectedItems,r=(0,m.Z)(a);!(e=r()).done;){var i=e.value;i&&t.invokePrimaryAction(i,n)}}catch(s){return}})),i.createElement("div",{className:"row"},i.createElement("div",{className:"col col--4"},i.createElement(d,{template:t,treeId:n,viewState:a,onPrimaryAction:f,environment:o})),i.createElement("div",{className:"col col--8"},i.createElement(h.Z,{className:"language-"+u.fileExtension,title:u.filePath},u.content)))}var k=n(7754),y=n(3221),v=n(7557),b=n(6572),w=["components"],N={sidebar_position:1},C="Quick start",I={unversionedId:"quick-start",id:"quick-start",title:"Quick start",description:"fseval helps you benchmark Feature Selection and Feature Ranking algorithms. Any algorithm that ranks features in importance.",source:"@site/docs/quick-start.mdx",sourceDirName:".",slug:"/quick-start",permalink:"/fseval/docs/quick-start",editUrl:"https://github.com/dunnkers/fseval/tree/website/docs/quick-start.mdx",tags:[],version:"current",sidebarPosition:1,frontMatter:{sidebar_position:1},sidebar:"tutorialSidebar",next:{title:"The pipeline",permalink:"/fseval/docs/the-pipeline"}},S=[{value:"Getting started",id:"getting-started",children:[],level:2}],A={toc:S};function x(e){var t=e.components,i=(0,r.Z)(e,w);return(0,s.kt)("wrapper",(0,a.Z)({},A,i,{components:t,mdxType:"MDXLayout"}),(0,s.kt)("h1",{id:"quick-start"},"Quick start"),(0,s.kt)("p",null,"fseval helps you benchmark ",(0,s.kt)("strong",{parentName:"p"},"Feature Selection")," and ",(0,s.kt)("strong",{parentName:"p"},"Feature Ranking")," algorithms. Any algorithm that ranks features in importance."),(0,s.kt)("p",null,"It comes useful if you are one of the following types of users:"),(0,s.kt)("ol",null,(0,s.kt)("li",{parentName:"ol"},(0,s.kt)("strong",{parentName:"li"},"Feature Selection / Feature Ranker algorithm authors"),". You are the author of a novel Feature Selection algorithm. Now, you have to prove the performance of your algorithm against other competitors. Therefore, you are going to run a large-scale benchmark. Many authors, however, spend much time rewriting similar pipelines to benchmark their algorithms. fseval helps you run benchmarks in a structured manner, on supercomputer clusters or on the cloud."),(0,s.kt)("li",{parentName:"ol"},(0,s.kt)("strong",{parentName:"li"},"Interpretable AI method authors"),". You wrote a new Interpretable AI method that aims to find out which features are most meaningful by ranking them. Now, the challenge is to find out how well your method ranked those features. fseval can help with this."),(0,s.kt)("li",{parentName:"ol"},(0,s.kt)("strong",{parentName:"li"},"Machine Learning practitioners"),". You have a dataset and want to find out with exactly what features your models will perform best. You can use fseval to try multiple Feature Selection or Feature Ranking algorithms.")),(0,s.kt)("p",null,"Key features \ud83d\ude80:"),(0,s.kt)("ul",null,(0,s.kt)("li",{parentName:"ul"},"Easily benchmark Feature Ranking algorithms"),(0,s.kt)("li",{parentName:"ul"},"Built on ",(0,s.kt)("a",{parentName:"li",href:"https://hydra.cc/"},"Hydra")),(0,s.kt)("li",{parentName:"ul"},"Support for distributed systems (SLURM through the ",(0,s.kt)("a",{parentName:"li",href:"https://hydra.cc/docs/plugins/submitit_launcher"},"Submitit launcher"),", AWS support through the ",(0,s.kt)("a",{parentName:"li",href:"https://hydra.cc/docs/plugins/ray_launcher/"},"Ray launcher"),")"),(0,s.kt)("li",{parentName:"ul"},"Reproducible experiments (your entire experiment can be described and reproduced by 1 YAML file)"),(0,s.kt)("li",{parentName:"ul"},"Send experiment results directly to a dashboard (integration with ",(0,s.kt)("a",{parentName:"li",href:"https://wandb.ai/"},"Weights and Biases")," is built-in)"),(0,s.kt)("li",{parentName:"ul"},"Export your data to any SQL database (integration with ",(0,s.kt)("a",{parentName:"li",href:"https://www.sqlalchemy.org/"},"SQLAlchemy"),")")),(0,s.kt)("h2",{id:"getting-started"},"Getting started"),(0,s.kt)("p",null,"Install fseval:"),(0,s.kt)("pre",null,(0,s.kt)("code",{parentName:"pre",className:"language-shell"},"pip install fseval\n")),(0,s.kt)("p",null,"Given the following ",(0,s.kt)("a",{parentName:"p",href:"https://github.com/dunnkers/fseval/tree/master/examples/quick-start"},"configuration"),":"),(0,s.kt)(o.Z,{groupId:"config-representation",mdxType:"Tabs"},(0,s.kt)(l.Z,{value:"yaml",label:"YAML",default:!0,mdxType:"TabItem"},(0,s.kt)(g,{treeId:"tree-1",template:{root:{conf:{dataset:{"synthetic.yaml":k.Z},ranker:{"anova.yaml":"name: ANOVA F-value\nestimator:\n  _target_: benchmark.ANOVAFValueClassifier\n_estimator_type: classifier\nestimates_feature_importances: true\n","mutual_info.yaml":"name: Mutual Info\nestimator:\n  _target_: benchmark.MutualInfoClassifier\n_estimator_type: classifier\nmultioutput: false\nestimates_feature_importances: true\n"},validator:{"knn.yaml":"name: k-NN\nestimator:\n  _target_: sklearn.neighbors.KNeighborsClassifier\n_estimator_type: classifier\nmultioutput: false\nestimates_target: true\n"},"my_config.yaml":y.Z},"benchmark.py":'import hydra\nfrom sklearn.base import BaseEstimator\nfrom sklearn.feature_selection import f_classif, mutual_info_classif\n\nfrom fseval.config import PipelineConfig\nfrom fseval.main import run_pipeline\n\n\nclass ANOVAFValueClassifier(BaseEstimator):\n    def fit(self, X, y):\n        scores, _ = f_classif(X, y)\n        self.feature_importances_ = scores\n\n\nclass MutualInfoClassifier(BaseEstimator):\n    def fit(self, X, y):\n        scores = mutual_info_classif(X, y)\n        self.feature_importances_ = scores\n\n\n@hydra.main(config_path="conf", config_name="my_config")\ndef main(cfg: PipelineConfig) -> None:\n    run_pipeline(cfg)\n\n\nif __name__ == "__main__":\n    main()\n'}},viewState:{"tree-1":{expandedItems:["conf","ranker","dataset","validator"],selectedItems:["my_config.yaml"]}},mdxType:"FileTreeCodeViewer"})),(0,s.kt)(l.Z,{value:"structured",label:"Structured Config",mdxType:"TabItem"},(0,s.kt)(g,{treeId:"tree-2",template:{root:{conf:{dataset:{"synthetic.py":v.Z},ranker:{"anova.py":'from fseval.config import EstimatorConfig\n\nanova_ranker = EstimatorConfig(\n    name="ANOVA F-value",\n    estimator=dict(\n        _target_="benchmark.ANOVAFValueClassifier",\n    ),\n    _estimator_type="classifier",\n    estimates_feature_importances=True,\n)\n',"mutual_info.py":'from fseval.config import EstimatorConfig\n\nmutual_info_ranker = EstimatorConfig(\n  name= "Mutual Info",\n  estimator=dict(\n    _target_="benchmark.MutualInfoClassifier",\n  ),\n  _estimator_type="classifier",\n  multioutput=False,\n  estimates_feature_importances=True,\n)\n'},validator:{"knn.py":'from fseval.config import EstimatorConfig\n\nknn_validator = EstimatorConfig(\n    name="k-NN",\n    estimator=dict(\n        _target_="sklearn.neighbors.KNeighborsClassifier",\n    ),\n    _estimator_type="classifier",\n    multioutput=False,\n    estimates_target=True,\n)\n'},"my_config.py":b.Z},"benchmark.py":'import hydra\nfrom fseval.config import PipelineConfig\nfrom fseval.main import run_pipeline\nfrom hydra.core.config_store import ConfigStore\nfrom sklearn.base import BaseEstimator\nfrom sklearn.feature_selection import f_classif, mutual_info_classif\n\nfrom conf.dataset.synthetic import synthetic_dataset\nfrom conf.my_config import my_config\nfrom conf.ranker.anova import anova_ranker\nfrom conf.ranker.mutual_info import mutual_info_ranker\nfrom conf.validator.knn import knn_validator\n\n\nclass ANOVAFValueClassifier(BaseEstimator):\n    def fit(self, X, y):\n        scores, _ = f_classif(X, y)\n        self.feature_importances_ = scores\n\n\nclass MutualInfoClassifier(BaseEstimator):\n    def fit(self, X, y):\n        scores = mutual_info_classif(X, y)\n        self.feature_importances_ = scores\n\n\ncs = ConfigStore.instance()\ncs.store(group="dataset", name="synthetic", node=synthetic_dataset)\ncs.store(group="ranker", name="anova", node=anova_ranker)\ncs.store(group="ranker", name="mutual_info", node=mutual_info_ranker)\ncs.store(group="validator", name="knn", node=knn_validator)\ncs.store(name="my_config", node=my_config)\n\n\n@hydra.main(config_path="conf", config_name="my_config")\ndef main(cfg: PipelineConfig) -> None:\n    run_pipeline(cfg)\n\n\nif __name__ == "__main__":\n    main()\n'}},viewState:{"tree-2":{expandedItems:["conf","ranker","dataset","validator"],selectedItems:["my_config.py"]}},mdxType:"FileTreeCodeViewer"}))),(0,s.kt)("br",null),(0,s.kt)("p",null,"We can then run a benchmark like so:"),(0,s.kt)("pre",null,(0,s.kt)("code",{parentName:"pre",className:"language-shell"},"python benchmark.py --multirun ranker='glob(*)' +callbacks.to_sql.url='sqlite:////Users/dunnkers/Downloads/results.sqlite'\n")),(0,s.kt)("p",null,(0,s.kt)("img",{alt:"Locale Dropdown",src:n(710).Z})),(0,s.kt)("p",null,"The results are now stored in a SQLite database. We can open the data using ",(0,s.kt)("a",{parentName:"p",href:"https://sqlitebrowser.org/"},"DB Browser for SQLite"),". We can access the validation scores in the ",(0,s.kt)("inlineCode",{parentName:"p"},"validation_scores")," table:"),(0,s.kt)("p",null,(0,s.kt)("img",{alt:"validation data",src:n(9979).Z})),(0,s.kt)("p",null,"In the example above,\nthe ",(0,s.kt)("span",{style:{backgroundColor:"#5050FF",color:"white"}},"purple"),"\xa0 line resembles ANOVA F value feature selection, and the ",(0,s.kt)("span",{style:{backgroundColor:"#0075DD",color:"white"}},"light blue"),"\xa0","\nline resembles Mutual Info.\nThis way, we can easily compare two feature selectors: ANOVA F Value and Mutual Info \u2728."))}x.isMDXComponent=!0},7557:function(e,t){t.Z='from fseval.config import DatasetConfig\nfrom fseval.types import Task\n\nsynthetic_dataset = DatasetConfig(\n    name="My synthetic dataset",\n    task=Task.classification,\n    adapter=dict(\n        _target_="sklearn.datasets.make_classification",\n        n_samples=10000,\n        n_informative=2,\n        n_classes=2,\n        n_features=20,\n        n_redundant=0,\n        random_state=0,\n        shuffle=False,\n    ),\n    feature_importances={"X[:, 0:2]": 1.0},\n)\n'},6572:function(e,t){t.Z='from fseval.config import PipelineConfig\nfrom omegaconf import MISSING\n\n# To set PipelineConfig defaults in a Structured Config, we must redefine the entire\n# defaults list.\nmy_config = PipelineConfig(\n    n_bootstraps=1,\n    defaults=[\n        "_self_",\n        # highlight-next-line\n        {"dataset": "synthetic"},\n        {"cv": "kfold"},\n        {"resample": "shuffle"},\n        {"ranker": MISSING},\n        # highlight-next-line\n        {"validator": "knn"},\n        {"storage": "local"},\n        # highlight-next-line\n        {"callbacks": ["to_sql"]},\n        {"metrics": ["feature_importances", "ranking_scores", "validation_scores"]},\n        {"override hydra/job_logging": "colorlog"},\n        {"override hydra/hydra_logging": "colorlog"},\n    ],\n)\n'},7754:function(e,t){t.Z="name: My synthetic dataset\ntask: classification\nadapter:\n  _target_: sklearn.datasets.make_classification\n  n_samples: 10000\n  n_informative: 2\n  n_classes: 2\n  n_features: 20\n  n_redundant: 0\n  random_state: 0\n  shuffle: false\nfeature_importances:\n  X[:, 0:2]: 1.0\n"},3221:function(e,t){t.Z="defaults:\n  - _self_\n  - base_pipeline_config\n  - override dataset: synthetic\n  - override validator: knn\n  - override /callbacks:\n      - to_csv\n\nn_bootstraps: 1\n\ncallbacks:\n  to_csv:\n    dir: /Users/dunnkers/Downloads/results_dir\n"},710:function(e,t,n){t.Z=n.p+"assets/images/terminal-f9425c8df4edc9d7be35209895df771a.svg"},9979:function(e,t,n){t.Z=n.p+"assets/images/validation_data-87fd715695a815828bb6f0dda59e0fc6.png"}}]);