isa ={"bird":["animal"],"dog":["animal"],"sparrow":["bird"]}
has_property={"Animal":["cells"]}
can_property={"Dog":["Bark"],"Bird":["Fly"]}

def get_superclass(concept):
    return isa.get(concept,None)

def inherits_property(concept,property_name):
    if concept in has_property and property_name in has_property[concept]:
        return True
     
    parent = get_superclass(concept)
    if parent:
        return inherits_property(parent,property_name)  
    
    return False  
print ("Does sparrow has cells?") 
print("Does Dog bark?")
print("Does dog can fly?")

