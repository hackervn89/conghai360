import subprocess
import sys
import os

def run_export():
    blender_path = r"C:\Program Files\Blender Foundation\Blender 5.1\blender.exe"
    if not os.path.exists(blender_path):
        blender_path = "blender"
        
    # We change directory to the folder containing the .blend file
    # so we can use strictly ASCII relative paths for command-line arguments.
    blend_dir = os.path.abspath("Mô hình")
    
    # Check if directory exists
    if not os.path.exists(blend_dir):
        print(f"Error: Directory '{blend_dir}' does not exist.")
        return
        
    blend_file = "BaoTang_Raglai_Museum.blend"
    script_file = "export_helper.py"
    script_path = os.path.join(blend_dir, script_file)
    
    # Helper code that runs inside Blender (with relative export path)
    helper_code = """import bpy
import os

print("--- STARTING AUTOMATIC EXPORT HELPER ---")

# Link Collection.001 if not linked
col = bpy.data.collections.get("Collection.001")
if col:
    if col.name not in bpy.context.scene.collection.children:
        bpy.context.scene.collection.children.link(col)
        print("Linked Collection.001 to scene.")

# Make sure all collections are visible
def enable_collections(layer_collection):
    layer_collection.exclude = False
    layer_collection.hide_viewport = False
    for child in layer_collection.children:
        enable_collections(child)

enable_collections(bpy.context.view_layer.layer_collection)

# Make sure custom objects are visible
for obj in bpy.data.objects:
    if obj.name in ["Plane", "Plane.002"] or obj.name.startswith("LT_"):
        obj.hide_viewport = False
        obj.hide_render = False
        obj.hide_set(False)

# Convert AREA lights to POINT lights for glTF compatibility
for obj in bpy.data.objects:
    if obj.type == 'LIGHT' and obj.data.type == 'AREA':
        obj.data.type = 'POINT'
        print(f"Converted {obj.name} to POINT light for glTF support.")

# Save the blend file
bpy.ops.wm.save_mainfile(filepath=bpy.data.filepath)
print("Saved blend file.")

# Export to GLB
output_glb = os.path.abspath("../core/data/phongtrungbay.glb")
bpy.ops.export_scene.gltf(
    filepath=output_glb,
    export_format='GLB',
    export_lights=False
)
print(f"Successfully exported GLB with lights to: {output_glb}")
print("--- AUTOMATIC EXPORT HELPER COMPLETED ---")
"""
    
    with open(script_path, "w", encoding="utf-8") as f:
        f.write(helper_code)
        
    print(f"Running Blender background export process...")
    try:
        result = subprocess.run(
            [blender_path, "-b", blend_file, "-P", script_file],
            cwd=blend_dir,
            capture_output=True,
            text=True,
            encoding="utf-8"
        )
        
        # Print output safely using sys.stdout.buffer
        sys.stdout.buffer.write(result.stdout.encode('utf-8', errors='replace'))
        if result.stderr:
            sys.stdout.buffer.write(b"\nErrors/Warnings:\n")
            sys.stdout.buffer.write(result.stderr.encode('utf-8', errors='replace'))
    except Exception as e:
        print(f"Error executing Blender: {e}")
    finally:
        if os.path.exists(script_path):
            os.remove(script_path)

if __name__ == "__main__":
    run_export()
