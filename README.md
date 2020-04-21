# taste.e
## Project Idea and Initial Planning
> **Idea:** An online community recipe swap site
>
> ___Data models and their properties___
>
> **User:** credentials - used to determine if someone can edit a page, or simply read it.
>
> **Content:** (CRUD) logical grouping of recipes that will compose the Table of Contents
>
> **Recipe:** (CRUD) the actual recipe including title, ingredients(FK), directions, a picture of the finished product, and a place for comments/ratings
>
> **Ingredient:** measurement and name of ingredient related to each recipe(FK)
>
## User Stories and Features
> ### MVP
> - As a viewer, I want to be able to see recipes others have loaded on the site so that I can see how other people prepare same foods or so I can find new recipes to try.
> - As a viewer, I want to be able to browse recipes by the primary ingredient (main protein) or primary function (appetizers, breads, etc.) so that I can find a specific recipe or just look for ideas.
> - As a contributor, I want to be able to upload my own recipes so that I can share some of my favorites that I think others will enjoy as well.
> - As a contributor, I should be the only person allowed to edit my own recipes so that only changes I'm aware of are being made.
> - As a viewer, I should be greeted by a home page that is pleasing to view, explains the site, and allows you to either login or continue as a guest so that I'm confident I understand what the site is for and how to use it.
> ### BONUS
> |topic|%complete|comments|
> |:---:|---:|:---|
> |social authentication|100%|login with Google enabled |
> |upload pics to s3|15%|loaded AWS amplify for react|
> |user preferences|25%|list of foods to avoid have been added to the data model|
> |comment/rate recipes |0% ||
> |tags|0%| searchable tags like: spicy, gluten free, time (from prep to eat)|
> |serach functionality| 0% |search by ingredients, contributor, or tags|
