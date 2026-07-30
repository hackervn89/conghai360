import bpy
import math
import os

print("--- KHOI CHAY THIET KE MAU: THE GRAND RAGLAI TRIANGULAR GABLE HALL ---")

# 1. XOA TOAN BO DOI TUONG CU
bpy.ops.object.select_all(action='SELECT')
bpy.ops.object.delete(use_global=False)

# 2. KHAI BAO KICH THUOC DAI SANH SIEU RONG VA TRAN MAI TAM GIAC CAO 7.5M
ROOM_WIDTH = 40.0
ROOM_LENGTH = 30.0
WALL_HEIGHT = 3.5   # Chieu cao tuong bien ben trai va ben phai
ROOF_PEAK_HEIGHT = 7.5 # Dinh nhon mai tam giac o chinh giua phong

# 3. TAO SAN GO TON SANG AM AP (Honey Oak Parquet Floor)
bpy.ops.mesh.primitive_plane_add(size=1.0, location=(0, -5, 0))
floor = bpy.context.active_object
floor.name = "PolishedFloor"
floor.scale = (ROOM_WIDTH, ROOM_LENGTH, 1.0)
bpy.ops.object.transform_apply(scale=True)

# 4. TAO TUONG BAO BIEN HAI BEN (Tuong go bien thap 3.5m)
wall_thickness = 0.3
walls_data = [
    ("Wall_Left", (-20, -5, WALL_HEIGHT/2), (wall_thickness, ROOM_LENGTH, WALL_HEIGHT)),
    ("Wall_Right", (20, -5, WALL_HEIGHT/2), (wall_thickness, ROOM_LENGTH, WALL_HEIGHT))
]

wall_objs = {}
for name, pos, scale in walls_data:
    bpy.ops.mesh.primitive_cube_add(size=1.0, location=pos)
    wall_obj = bpy.context.active_object
    wall_obj.name = name
    wall_obj.scale = scale
    bpy.ops.object.transform_apply(scale=True)
    wall_objs[name] = wall_obj

# 5. TAO HE TRAN MAI DOC TAM GIAC RAGLAI (Triangular Vaulted Ceiling Slopes)
# Doc chieu nghieng tu x=-20 len den x=0 o cao do 7.5m
# Doc ben Trai
bpy.ops.mesh.primitive_plane_add(size=1.0, location=(-10.0, -5.0, (WALL_HEIGHT + ROOF_PEAK_HEIGHT)/2))
roof_left = bpy.context.active_object
roof_left.name = "Roof_Slope_Left"
# Tinh toan do chieu dai doc va goc nghieng
slope_width = math.sqrt(20.0**2 + (ROOF_PEAK_HEIGHT - WALL_HEIGHT)**2)
angle_rot = math.atan((ROOF_PEAK_HEIGHT - WALL_HEIGHT) / 20.0)
roof_left.scale = (slope_width, ROOM_LENGTH, 1.0)
roof_left.rotation_euler = (0, -angle_rot, 0)  # Goc am de doc len tren đỉnh giữa
bpy.ops.object.transform_apply(scale=True, rotation=True)

# Doc ben Phai
bpy.ops.mesh.primitive_plane_add(size=1.0, location=(10.0, -5.0, (WALL_HEIGHT + ROOF_PEAK_HEIGHT)/2))
roof_right = bpy.context.active_object
roof_right.name = "Roof_Slope_Right"
roof_right.scale = (slope_width, ROOM_LENGTH, 1.0)
roof_right.rotation_euler = (0, angle_rot, 0)   # Goc duong de doc len tren dinh giua
bpy.ops.object.transform_apply(scale=True, rotation=True)

# Gán do day cho hai mai nghieng
def solidify_mesh(obj, thickness):
    bpy.context.view_layer.objects.active = obj
    mod = obj.modifiers.new(name="Solidify", type='SOLIDIFY')
    mod.thickness = thickness
    bpy.ops.object.modifier_apply(modifier="Solidify")

solidify_mesh(roof_left, 0.15)
solidify_mesh(roof_right, 0.15)

# 6. TUONG DAU HOI TAM GIAC PHIA TRUOC VA SAU (Front & Back Triangular Gable Walls)
# Tuong sau tam giac o y = -20m
bpy.ops.mesh.primitive_cube_add(size=1.0, location=(0, -20.0, WALL_HEIGHT/2))
wall_back_lower = bpy.context.active_object
wall_back_lower.name = "Wall_Back_Lower"
wall_back_lower.scale = (ROOM_WIDTH, wall_thickness, WALL_HEIGHT)
bpy.ops.object.transform_apply(scale=True)

# Dau hoi tam giac tren tuong sau
bpy.ops.mesh.primitive_cylinder_add(vertices=3, radius=20.0, depth=wall_thickness, location=(0, -20.0, WALL_HEIGHT))
wall_back_upper = bpy.context.active_object
wall_back_upper.name = "Wall_Back_Triangular"
wall_back_upper.scale = (1.0, 1.0, (ROOF_PEAK_HEIGHT - WALL_HEIGHT) / 20.0)
wall_back_upper.rotation_euler = (math.pi/2, 0, 0)
bpy.ops.object.transform_apply(scale=True, rotation=True)

# Tuong truoc tam giac o y = 10m
bpy.ops.mesh.primitive_cube_add(size=1.0, location=(0, 10.0, WALL_HEIGHT/2))
wall_front_lower = bpy.context.active_object
wall_front_lower.name = "Wall_Front_Lower"
wall_front_lower.scale = (ROOM_WIDTH, wall_thickness, WALL_HEIGHT)
bpy.ops.object.transform_apply(scale=True)

# Dau hoi tam giac tren tuong truoc
bpy.ops.mesh.primitive_cylinder_add(vertices=3, radius=20.0, depth=wall_thickness, location=(0, 10.0, WALL_HEIGHT))
wall_front_upper = bpy.context.active_object
wall_front_upper.name = "Wall_Front_Triangular"
wall_front_upper.scale = (1.0, 1.0, (ROOF_PEAK_HEIGHT - WALL_HEIGHT) / 20.0)
wall_front_upper.rotation_euler = (math.pi/2, 0, 0)
bpy.ops.object.transform_apply(scale=True, rotation=True)

# Helper function cat cua vom cong mem mai
def cut_archway(wall_obj, x_pos, door_y):
    bpy.ops.mesh.primitive_cube_add(size=1.0, location=(x_pos, door_y, 1.1))
    box_cutter = bpy.context.active_object
    box_cutter.scale = (2.2, 4.0, 2.2) # Cửa vòm cao 2.2m
    bpy.ops.object.transform_apply(scale=True)
    
    bpy.ops.mesh.primitive_cylinder_add(radius=1.1, depth=4.0, location=(x_pos, door_y, 2.2))
    cyl_cutter = bpy.context.active_object
    cyl_cutter.rotation_euler = (0, math.pi/2, 0)
    bpy.ops.object.transform_apply(scale=True, rotation=True)
    
    bool_box = wall_obj.modifiers.new(name="BoxCut", type='BOOLEAN')
    bool_box.operation = 'DIFFERENCE'
    bool_box.object = box_cutter
    bpy.context.view_layer.objects.active = wall_obj
    bpy.ops.object.modifier_apply(modifier="BoxCut")
    
    bool_cyl = wall_obj.modifiers.new(name="CylCut", type='BOOLEAN')
    bool_cyl.operation = 'DIFFERENCE'
    bool_cyl.object = cyl_cutter
    bpy.context.view_layer.objects.active = wall_obj
    bpy.ops.object.modifier_apply(modifier="CylCut")
    
    bpy.ops.object.select_all(action='DESELECT')
    box_cutter.select_set(True)
    cyl_cutter.select_set(True)
    bpy.ops.object.delete()

# 7. VÁCH LAM GỖ THÔNG THẤU CAO 3.5M (Vertical Wood Slat Partition Screens)
# Ngăn chia phòng Trái và Phải bằng vách lam gỗ đứng cao 3.5m, cho phép nhìn thấu hoàn toàn.
def create_slat_screen(name, x_pos):
    bpy.ops.mesh.primitive_cube_add(size=1.0, location=(x_pos, -5.0, WALL_HEIGHT/2))
    screen_base = bpy.context.active_object
    screen_base.name = name
    screen_base.scale = (0.15, ROOM_LENGTH - 0.2, WALL_HEIGHT)
    bpy.ops.object.transform_apply(scale=True)
    
    # Cắt cửa vòm thông phòng ở giữa vách lam
    cut_archway(screen_base, x_pos, -5.0)
    return screen_base

screen_left = create_slat_screen("SlatScreen_Left", -8.0)
screen_right = create_slat_screen("SlatScreen_Right", 8.0)

# 8. DÃY ĐÈN LED CHẠY DỌC SỐNG MÁI TAM GIÁC (Recessed Gable LED Light Tracks)
# Dựng dải LED chạy dọc sống trần nhọn ở giữa sảnh và hai bên chéo trần
led_strip_objs = []

# LED 1: Chạy dọc đỉnh sống nhọn ở giữa (x=0, z=7.4m)
bpy.ops.mesh.primitive_cube_add(size=1.0, location=(0.0, -5.0, ROOF_PEAK_HEIGHT - 0.12))
led_peak = bpy.context.active_object
led_peak.name = "CeilingLED_Peak"
led_peak.scale = (0.2, ROOM_LENGTH - 1.0, 0.04)
bpy.ops.object.transform_apply(scale=True)
led_strip_objs.append(led_peak)

# LED 2 & 3: Chạy dọc sườn dốc nghiêng bên trái và phải
bpy.ops.mesh.primitive_cube_add(size=1.0, location=(-10.0, -5.0, (WALL_HEIGHT + ROOF_PEAK_HEIGHT)/2 - 0.08))
led_slope_l = bpy.context.active_object
led_slope_l.name = "CeilingLED_Slope_L"
led_slope_l.scale = (0.15, ROOM_LENGTH - 1.0, 0.04)
led_slope_l.rotation_euler = (0, angle_rot, 0)
bpy.ops.object.transform_apply(scale=True, rotation=True)
led_strip_objs.append(led_slope_l)

bpy.ops.mesh.primitive_cube_add(size=1.0, location=(10.0, -5.0, (WALL_HEIGHT + ROOF_PEAK_HEIGHT)/2 - 0.08))
led_slope_r = bpy.context.active_object
led_slope_r.name = "CeilingLED_Slope_R"
led_slope_r.scale = (0.15, ROOM_LENGTH - 1.0, 0.04)
led_slope_r.rotation_euler = (0, -angle_rot, 0)
bpy.ops.object.transform_apply(scale=True, rotation=True)
led_strip_objs.append(led_slope_r)

if led_strip_objs:
    bpy.ops.object.select_all(action='DESELECT')
    for l in led_strip_objs:
        l.select_set(True)
    bpy.context.view_layer.objects.active = led_strip_objs[0]
    bpy.ops.object.join()
    led_strip_objs[0].name = "AllCeilingLEDs"

# 9. BỤC TRƯNG BÀY GỖ MỘC MẠC (Solid Wood Pedestals)
# A. Bục gỗ lối vào sảnh chính - Đặt Tượng Raglai (x=0, z=-5)
bpy.ops.mesh.primitive_cube_add(size=1.0, location=(0.0, -5.0, 0.4))
pedestal = bpy.context.active_object
pedestal.name = "CentralPedestal"
pedestal.scale = (1.5, 1.5, 0.8)
bpy.ops.object.transform_apply(scale=True)

# Khung kính bao quanh pedestal trung tam
bpy.ops.mesh.primitive_cube_add(size=1.0, location=(0.0, -5.0, 1.45))
glass_case = bpy.context.active_object
glass_case.name = "CentralGlassCase"
glass_case.scale = (1.5, 1.5, 1.3)
bpy.ops.object.transform_apply(scale=True)

# Nắp gỗ mộc ở đỉnh tủ kính
bpy.ops.mesh.primitive_cube_add(size=1.0, location=(0.0, -5.0, 2.15))
top_cap = bpy.context.active_object
top_cap.name = "CentralTopCap"
top_cap.scale = (1.5, 1.5, 0.1)
bpy.ops.object.transform_apply(scale=True)

# B. Các bục gỗ trưng bày ở hai phòng cánh (Trái & Phải)
stands_data = [
    ("Stand_Left_Sogv", (-14.0, -5.0, 0.45), (1.5, 3.2, 0.9)), # Bệ trưng bày Sổ Vàng
    ("Stand_Right_Ocop1", (14.0, -8.0, 0.45), (1.1, 1.1, 0.9)),
    ("Stand_Right_Ocop2", (14.0, -2.0, 0.45), (1.1, 1.1, 0.9))
]

stand_objs = []
for name, pos, scale in stands_data:
    bpy.ops.mesh.primitive_cube_add(size=1.0, location=pos)
    stand = bpy.context.active_object
    stand.name = name
    stand.scale = scale
    bpy.ops.object.transform_apply(scale=True)
    stand_objs.append(stand)

# 10. THIẾT LẬP HỆ THỐNG VẬT LIỆU GỖ SỒI VÀNG ẤM SÁNG (Honey Oak Wood Materials)
def create_textured_material(name, texture_path, repeat_x=1.0, repeat_y=1.0, roughness=0.5):
    mat = bpy.data.materials.new(name=name)
    mat.use_nodes = True
    nodes = mat.node_tree.nodes
    links = mat.node_tree.links
    bsdf = nodes.get("Principled BSDF")
    bsdf.inputs['Roughness'].default_value = roughness
    
    if os.path.exists(texture_path):
        tex_node = nodes.new('ShaderNodeTexImage')
        try:
            tex_node.image = bpy.data.images.load(texture_path)
        except Exception as e:
            print(f"Loi load image {texture_path}: {e}")
        tex_coord = nodes.new('ShaderNodeTexCoord')
        mapping = nodes.new('ShaderNodeMapping')
        mapping.inputs['Scale'].default_value = (repeat_x, repeat_y, 1.0)
        links.new(tex_coord.outputs['UV'], mapping.inputs['Vector'])
        links.new(mapping.outputs['Vector'], tex_node.inputs['Vector'])
        links.new(tex_node.outputs['Color'], bsdf.inputs['Base Color'])
    return mat

# Sử dụng tệp chất liệu cao cấp phân lớp
floor_tex_path = os.path.abspath("core/assets/tex_wood_floor.png")
wood_tex_path = os.path.abspath("core/assets/tex_wood_wall.png")
wall_tex_path = os.path.abspath("core/assets/tex_wall.png")

# Định nghĩa các chất liệu PBR có độ tương phản nghệ thuật
floor_mat = create_textured_material("WoodFloorMat", floor_tex_path, repeat_x=8.0, repeat_y=6.0, roughness=0.45)
plaster_wall_mat = create_textured_material("MuseumPlasterWallMat", wall_tex_path, repeat_x=6.0, repeat_y=6.0, roughness=0.75)
slat_mat = create_textured_material("DarkSlatScreenMat", wood_tex_path, repeat_x=1.0, repeat_y=3.0, roughness=0.6)
pedestal_mat = create_textured_material("PedestalWoodMat", wood_tex_path, repeat_x=1.0, repeat_y=1.0, roughness=0.65)

# Kính trong suốt cao cấp tủ trung tâm
glass_mat = bpy.data.materials.new(name="ShowcaseGlassMat")
glass_mat.use_nodes = True
bsdf_glass = glass_mat.node_tree.nodes.get("Principled BSDF")
bsdf_glass.inputs['Base Color'].default_value = (0.85, 0.95, 0.95, 1.0)
bsdf_glass.inputs['Roughness'].default_value = 0.05
bsdf_glass.inputs['Alpha'].default_value = 0.12  # Độ trong suốt 88%
glass_mat.blend_method = 'BLEND'
if 'Transmission Weight' in bsdf_glass.inputs:
    bsdf_glass.inputs['Transmission Weight'].default_value = 0.95
elif 'Transmission' in bsdf_glass.inputs:
    bsdf_glass.inputs['Transmission'].default_value = 0.95
bsdf_glass.inputs['IOR'].default_value = 1.45

# Nắp kim loại đen
metal_mat = bpy.data.materials.new(name="BlackMetalMat")
metal_mat.use_nodes = True
bsdf_metal = metal_mat.node_tree.nodes.get("Principled BSDF")
bsdf_metal.inputs['Base Color'].default_value = (0.02, 0.02, 0.02, 1.0)
bsdf_metal.inputs['Metallic'].default_value = 0.95
bsdf_metal.inputs['Roughness'].default_value = 0.35

# Dải đèn LED trần phát sáng chuyên nghiệp
led_mat = bpy.data.materials.new(name="LEDEmissionMat")
led_mat.use_nodes = True
nodes_led = led_mat.node_tree.nodes
links_led = led_mat.node_tree.links
for node in list(nodes_led):
    if node.type == 'OUTPUT_MATERIAL':
        output_node = node
    else:
        nodes_led.remove(node)
emission_node = nodes_led.new('ShaderNodeEmission')
emission_node.inputs['Color'].default_value = (1.0, 0.95, 0.88, 1.0) # Vàng ấm nghệ thuật
emission_node.inputs['Strength'].default_value = 8.0  # Cường độ phát quang mạnh mẽ
links_led.new(emission_node.outputs['Emission'], output_node.inputs['Surface'])

# 11. GÁN VẬT LIỆU CHO CÁC ĐỐI TƯỢNG TRÊN SCENE
floor.data.materials.append(floor_mat)
roof_left.data.materials.append(plaster_wall_mat)   # Mái dốc thạch cao trắng phản xạ ánh sáng mịn
roof_right.data.materials.append(plaster_wall_mat)

if screen_left: screen_left.data.materials.append(slat_mat)
if screen_right: screen_right.data.materials.append(slat_mat)

if led_strip_objs:
    led_strip_objs[0].data.materials.append(led_mat)

# Phủ chất liệu thạch cao trắng bảo tàng cho toàn bộ tường bao và tường tam giác
for obj in bpy.data.objects:
    if "Wall_" in obj.name:
        obj.data.materials.append(plaster_wall_mat)

pedestal.data.materials.append(pedestal_mat)
glass_case.data.materials.append(glass_mat)
top_cap.data.materials.append(metal_mat)

for stand in stand_objs:
    stand.data.materials.append(pedestal_mat)

# 12. TỰ ĐỘNG TRẢI UV SMART PROJECT PHÁT VÂN GỖ HOÀN MỸ
def smart_unwrap_object(obj):
    bpy.ops.object.select_all(action='DESELECT')
    obj.select_set(True)
    bpy.context.view_layer.objects.active = obj
    bpy.ops.object.mode_set(mode='EDIT')
    bpy.ops.mesh.select_all(action='SELECT')
    bpy.ops.uv.smart_project(island_margin=0.002)
    bpy.ops.object.mode_set(mode='OBJECT')

print("Dang unwrap UV chong stretching cho toan bo mesh...")
unwrap_targets = [
    floor, roof_left, roof_right,
    screen_left, screen_right,
    pedestal, glass_case, top_cap
]
unwrap_targets.extend(stand_objs)
if led_strip_objs: unwrap_targets.append(led_strip_objs[0])

for obj in bpy.data.objects:
    if "Wall_" in obj.name:
        unwrap_targets.append(obj)

for target in unwrap_targets:
    try:
        smart_unwrap_object(target)
    except Exception as e:
        print(f"Loi unwrap {target.name}: {e}")

# 13. ĐÓNG GÓI VÀ XUẤT FILE GLB TỐI ƯU
output_glb_path = os.path.abspath("core/data/museum_structure.glb")
print(f"Dang dong goi va xuat file GLB ra: {output_glb_path}")

try:
    if hasattr(bpy.ops, 'export_scene') and hasattr(bpy.ops.export_scene, 'gltf'):
        bpy.ops.export_scene.gltf(filepath=output_glb_path, export_format='GLB')
    else:
        bpy.ops.wm.gltf_export(filepath=output_glb_path, export_format='GLB')
    print("--- DONG GOI VA XUAT GLB PHONG GO RAGLAI THANH CONG! ---")
except Exception as e:
    print(f"Loi khi xuat file GLB: {str(e)}")
